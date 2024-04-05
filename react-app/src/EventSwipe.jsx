import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import 'swiper/css/effect-cards';
import "./swiperStyle.css"
import MovieHall from "./MovieHall.jsx";
import films_imported from "../../backend/data/films_vladivostok_05_04_2024.json"
import films_times from "../../backend/data/seances_vladivostok_05_04_2024.json"
// now films import is hardcoded, should be done better later

const SwipableCard = function () {
    let films = [...films_imported];
    films = films.sort(() => 0.5 - Math.random());
    console.log(films);

    const getTime = (id, times) => {
        for (let i = 0; i < times.length; i++)
            if (id === times.nameId)
                return times.time
        return "-1"
    }

    return (
        <>
            <Swiper>
              {films.map((film) => (
                <SwiperSlide key={film.filmId}>
                  <MovieHall film={film} time={getTime(film.filmId, films_times)}/>
                </SwiperSlide>
              ))}
            </Swiper>
        </>
    );
};

export default SwipableCard;
