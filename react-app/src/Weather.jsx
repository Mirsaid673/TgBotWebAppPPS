import {useEffect, useState} from "react";
"react/prop-types"
import { Swiper, SwiperSlide } from "swiper/react";

import axios from "axios";
import "./Weather.css";
import weather from "./assets/weather/weather.png"
import water from "./assets/weather/drop.png"   
import pressure from "./assets/weather/pressure.png"
import therm from "./assets/weather/temperature.png"
import wind from "./assets/weather/wind.png"
import {EffectCards} from "swiper/modules";
import "swiper/css";
import 'swiper/css/effect-cards';
import "./swiperStyle.css"

const weatherSlide = (weatherData) => {
    return (
        <div className="weather-container">
            {weatherData ? (
                <>
                    <h1 className={'headerGap'}>Погода во Владивостоке</h1>
                    <div>
                        <img src={weather} alt={weather}/>
                        <p>Описание: {weatherData.weather[0].description}</p>
                    </div>
                    <div>
                        <img src={therm} alt={therm}/>
                        <p>Температура: {weatherData.main.temp}°C</p>
                    </div>
                    <div>
                        <img src={therm} alt={therm} className={'transparent'}/>
                        <p>Ощущается как: {weatherData.main.feels_like}°C</p>
                    </div>
                    <div>
                        <img src={water} alt={water}/>
                        <p>Влажность: {weatherData.main.humidity}%</p>
                    </div>
                    <div>
                        <img src={pressure} alt={pressure}/>
                        <p>Давление: {weatherData.main.pressure * 0.75} мм рт. ст.</p>
                    </div>
                    <div>
                        <img src={wind} alt={wind}/>
                        <p>Скорость ветра: {weatherData.wind.speed} м/с</p>
                    </div>
                </>
            ) : (
                <p>Loading weather data...</p>
            )}
        </div>
    );
}

const WeatherSlide = (props) => {

    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/forecast?q=Vladivostok&units=metric&lang=ru&appid=9e274a17162b8b27cfc5730a2d8f4fc7`
                );
                setWeatherData(response.data.list[props.index]);
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        weatherSlide(weatherData)
    );
};

const Weather = () => {
    const range = (count) => {
        let numbers = []
        for (let i = 0; i < count; i++) {
            numbers.push(i)
        }
        return numbers
    }

    return (
        <>
            <Swiper className="mySwiper" modules={[EffectCards]} effect="cards">
                {range(10).map((el, val) => (
                    <SwiperSlide key={el}><WeatherSlide index={val}/></SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};

export default Weather;
