import os
import sys
import requests
import json
from datetime import datetime
from bs4 import BeautifulSoup

_, city = sys.argv

t_date = datetime.now().strftime('%d_%m_%Y')
seances: list[dict] = []
films: list[dict] = []
theatres_seancesIds: dict[str, list[int]] = {}
genre_namesIds: dict[str, set[int]] = {}
dates_days_of_week: dict[str, str] = {}
films_ids: set[int] = set()
all_films_ids: list[int] = []


# get the HTML document
def collect_data() -> None:
    if not os.path.isfile(f'data_{city}_{t_date}.html'):
        response = requests.get(url=f'https://kino.vl.ru/films/seances/?city={city}')
        print(f'https://kino.vl.ru/films/seances/?city={city} fetched')
        if response.status_code != 200:
            raise KeyError(f'Response is {response.status_code}')
        with open(f'data_{city}_{t_date}.html', 'w') as file:
            file.write(response.text)


# 1 апреля -> 01.04
def strict_date_format(text: str) -> str:
    text = text.split()
    day = text[0]
    month = text[1]
    if len(day) == 1:
        day = '0' + day
    months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля',
              'августа', 'сентября', 'октября', 'ноября', 'декабря']
    month = str(months.index(month) + 1)
    if len(month) == 1:
        month = '0' + month
    return day + '.' + month


# separate the day of the week and delete extra whitespaces
def get_clear_text(text: str) -> tuple[str, str]:
    text = text.strip()
    days_of_week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']
    found_day = None
    for day in days_of_week:
        rubbish = str(day + ', ')
        if rubbish in text:
            text = text.removeprefix(rubbish)
            found_day = day
            break
    return text, found_day


def write_film(name: str, rating: int, genres: list[str], length: int,
               description: str, picture_href: str, film_id: int) -> None:
    for genre in genres:
        if genre not in genre_namesIds:
            genre_namesIds[genre] = set()
        genre_namesIds[genre].add(film_id)

    films.append({})
    data = [('filmId', film_id), ('name', name), ('rating', rating), ('genres', genres),
            ('length', length), ('description', description)]
    for elem in data:
        films[-1][elem[0]] = elem[1]

    # download picture
    img_data = requests.get(f'https://kino.vl.ru/kino/images/{picture_href}').content
    with open(f'images/{film_id}.jpg', 'wb') as handler:
        handler.write(img_data)


def parse_film(elem: BeautifulSoup, film_id: int):
    name: str = elem.find(class_='film__title').get_text().strip()
    if name in films:
        return
    duration: int = -1
    main_info: BeautifulSoup = elem.find(class_='film__info-main')
    for info in main_info.find_all(class_='film__info-text'):
        if 'Продолжительность' in info.get_text().strip():
            duration = int(info.get_text().strip().split('\n')[-1].strip().split(' ')[0])
            break
    description: str = elem.find(class_='film__description').get_text().strip()
    picture_href_elem: BeautifulSoup = elem.find(class_='js-film-pictures-swiper-wrapper')
    rating_elem: BeautifulSoup = elem.find(class_='text-value age')
    genres_elem: BeautifulSoup = elem.find(class_='genre')
    picture_href: str = ''
    genres: list[str] = []
    rating: int = 0
    if picture_href_elem:
        picture_href = picture_href_elem.contents[1]['href'].split('/')[-1]
    if genres_elem:
        genres = genres_elem.find_next().get_text(strip=True).split(', ')
    if rating_elem:
        rating = int(rating_elem.get_text().strip()[:-1])
    write_film(name, rating, genres, duration, description, picture_href, film_id)


# parse seance cost
def parse_cost(ref: str, theatre: str, date: str, time: str, city: str) -> int:
    global t_date
    new_film: bool = False
    # ref constitutes '/film/50183' (films has a uniq id)
    film_id = ref.split('/')[-2]  # separate id
    films_ids.add(int(film_id))
    if not os.path.isfile(f'films/{city}_{t_date}_{film_id}.html'):  # first check if file exists not to parse it twice
        new_film = True
        response = requests.get(f'https://kino.vl.ru{ref}?city={city}')
        print(f'https://kino.vl.ru{ref}?city={city} fetched')
        if response.status_code != 200:
            raise KeyError(f'Response is {response.status_code}')
        with open(f'films/{city}_{t_date}_{film_id}.html', 'w') as file:
            file.write(response.text)
    with open(f'films/{city}_{t_date}_{film_id}.html') as file:
        soup = BeautifulSoup(file, "html.parser")
    if new_film:
        parse_film(soup, int(film_id))
    date_headings = soup.find_all(id="film__seances")[0].contents  # headers with dates of tables with times
    i = 0
    rows = ''
    while i < len(date_headings):
        elem = date_headings[i]
        if (elem != '\n' and elem.string != 'Нет сеансов'
                and elem['class'][0] == 'day-title' and date in elem['data-ga-label']):  # right date found
            rows = date_headings[i + 2].find_next().find_all(class_='film_list seances-table__data-row')  # save seances
            break
        i += 1
    for row in rows:
        if row.contents[1].get_text().strip() == time and theatre in row.contents[3].get_text().strip():
            tmp = row.contents[7].string.strip().split()
            if len(tmp) >= 2:
                return int(tmp[1])
            else:
                return -1  # price is not set


# list of tuples (flm_name, theatre, cost) (possibly more than one theatre for the same film)
def name_to_theatre(elem: BeautifulSoup, date: str, time: str, city: str) -> list[tuple[int, str, int]]:
    result = []
    name_id: int = int(elem.find('a')['href'].split('/')[-2])
    for theatre in elem.parent.find(class_='table-responsive__theatre-name').find_all('a'):
        _theatre = theatre.get_text().strip()
        cost = parse_cost(elem.find_next()["href"], _theatre, date, time, city)
        result.append((name_id, _theatre, cost))
    return result


# write the seance to the dict
def write_seance(curr_date: str, curr_time: str, triples: list) -> None:
    seances.append({})
    for [nameId, theatre, cost] in triples:
        elems = [("date", strict_date_format(curr_date)), ("time", curr_time), ("nameId", nameId),
                 ("theatre", theatre), ("cost", cost), ("seanceId", -1)]
        for [key, value] in elems:
            seances[-1][key] = value


# parse films from the HTML document
def parse_data():
    # `date` means the real today's date; `curr_date` and `curr_time` are intended for currently parsing elements
    with open(f'data_{city}_{t_date}.html') as file:
        soup = BeautifulSoup(file, 'html.parser')

    curr_date = ""

    trs = soup.find_all('tr')
    i = 0
    while i < len(trs):  # while-loop is chosen to be able to skip some elements from the inside
        tr = trs[i]
        for_date = tr.find(class_="films-seances__seance-date")
        for_time = tr.find(class_='time')
        if for_date:  # new date mark
            curr_date, day_of_week = get_clear_text(for_date.get_text())
            dates_days_of_week[strict_date_format(curr_date)] = day_of_week
            # seances[curr_date] = {}
        elif for_time:  # new time mark (they have one time tag for several films)
            curr_time, _ = get_clear_text(for_time.get_text())
            # seances[curr_date][curr_time] = []
            for_name = trs[i].find(class_='table-responsive__film-name')
            write_seance(curr_date, curr_time, name_to_theatre(for_name, curr_date, curr_time, city))
            if 'rowspan' in for_time.attrs:
                for j in range(int(for_time['rowspan']) - 1):  # the next `rowspan` elems contain films for `curr_time`
                    i += 1
                    for_name = trs[i].find(class_='table-responsive__film-name')
                    write_seance(curr_date, curr_time, name_to_theatre(for_name, curr_date, curr_time, city))
        i += 1


def save_data() -> None:
    # add ids to seances and theatres
    seance_id = 0
    for seance in seances:
        seance['seanceId'] = seance_id
        theatre = seance['theatre']
        if theatre not in theatres_seancesIds:
            theatres_seancesIds[theatre] = []
        theatres_seancesIds[theatre].append(seance_id)
        seance_id += 1

    # theatres_seancesIds to fine format
    theatres_seancesIds_fine: list[dict] = []
    for theatre in theatres_seancesIds:
        theatres_seancesIds_fine.append({})
        theatres_seancesIds_fine[-1]['theatre'] = theatre
        theatres_seancesIds_fine[-1]['seance_ids'] = theatres_seancesIds[theatre]

    # replace sets with lists in genre_namesIds
    genre_names_dict: list[dict] = []
    for genre in genre_namesIds:
        genre_names_dict.append({})
        genre_names_dict[-1]['genre'] = genre
        genre_names_dict[-1]['filmIds'] = list(genre_namesIds[genre])

    for film in films:
        all_films_ids.append(film['filmId'])

    # create jsons
    data = [(seances, 'seances'), (films, 'films'), (theatres_seancesIds_fine, 'theatres-seancesIds'),
            (genre_names_dict, 'genre-namesIds'), (dates_days_of_week, 'dates-days-of-week'),
            (all_films_ids, 'films-ids')]
    for elem in data:
        json.dump(elem[0], open(f'{elem[1]}_{city}_{t_date}.json', 'a'), indent=4, ensure_ascii=False)


def main():
    os.chdir('data')
    collect_data()
    parse_data()
    save_data()
    os.chdir('..')


def fetch_data():
    main()


if __name__ == '__main__':
    main()
