import React, {useEffect, useState} from "react";
import axios from "axios";
import "./Weather.css";
import weather from "./assets/weather/weather.png"
import water from "./assets/weather/drop.png"
import pressure from "./assets/weather/pressure.png"
import therm from "./assets/weather/temperature.png"
import wind from "./assets/weather/wind.png"

const Weather = () => {

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
};

export default Weather;
