import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "./swiperStyle.css"
import MovieHall from "./MovieHall.jsx";
import films_imported from "../../backend/data/films_vladivostok_04_04_2024.json"
// now films import is hardcoded, should be done better later

const SwipableCard = function () {
    let films = [...films_imported];
    films = films.sort(() => 0.5 - Math.random());
    console.log(films);

    return (
        <>
            <Swiper>
              {films.map((film) => (
                <SwiperSlide key={film.filmId}>
                  <MovieHall film={film} />
                </SwiperSlide>
              ))}
            </Swiper>
        </>
    );
};

export default SwipableCard;
