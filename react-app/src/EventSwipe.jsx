import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import "swiper/css";
import 'swiper/css/effect-cards';
import "./swiperStyle.css"
import MovieHall from "./MovieHall.jsx";
import films_imported from "../../backend/data/films_vladivostok_05_04_2024.json"
// now films import is hardcoded, should be done better later

const SwipableCard = function () {
    let films = [...films_imported];
    films = films.sort(() => 0.5 - Math.random());

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
