import React, {useEffect, useState} from "react";
import axios from "axios";
import {Image, Icon} from "@chakra-ui/react";
import {WiDayCloudy, WiRain, WiSnow, WiDaySunny} from "react-icons/wi";
import "./Weather.css";
import weather from "./assets/weather/weather.png"
import water from "./assets/weather/drop.png"
import pressure from "./assets/weather/pressure.png"
import therm from "./assets/weather/temperature.png"
import wind from "./assets/weather/wind.png"

const Weather = () => {
    const getIcon = (type) => {
        if (type === "Clear")
            return WiDaySunny;
        if (type === "Snow")
            return WiSnow;
        if (type === "Clouds")
            return WiDayCloudy;
        if (type === "Rain")
            return WiRain;
    }

    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=Vladivostok&units=metric&lang=ru&appid=9e274a17162b8b27cfc5730a2d8f4fc7`
                );
                setWeatherData(response.data);
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="weather-container">
            {weatherData ? (
                <>
                    <h1 className={'headerGap'}>Погода во Владивостоке</h1>
                    <div className={'weather-property'}>
                        <img src={weather} alt={weather}></img>
                        <p>Описание: {weatherData.weather[0].description}</p>
                    </div>
                    <div className={'weather-property'}>
                        <img src={therm} alt={therm}></img>
                        <p>Температура: {weatherData.main.temp}°C</p>
                    </div>
                    <div className={'weather-property'}>
                        <img src={therm} alt={therm} className={'transparent'}></img>
                        <p>Ощущается как: {weatherData.main.feels_like}°C</p>
                    </div>
                    <div className={'weather-property'}>
                        <img src={water} alt={water}></img>
                        <p>Влажность: {weatherData.main.humidity}</p>
                    </div>
                    <div className={'weather-property'}>
                        <img src={pressure} alt={pressure}></img>
                        <p>Давление: {weatherData.main.pressure}</p>
                    </div>
                    <div className={'weather-property'}>
                        <img src={wind} alt={wind}></img>
                        <p>Скорость ветра: {weatherData.wind.speed}м/с</p>
                    </div>
                </>
            ) : (
                <p>Loading weather data...</p>
            )}
        </div>
    );
};

export default Weather;
