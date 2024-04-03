import React, { useEffect, useState } from "react";
import axios from "axios";
import { Image, Icon } from "@chakra-ui/react";
import { WiDayCloudy, WiRain, WiSnow, WiDaySunny } from "react-icons/wi";
import "./Weather.css";

const Weather = () => {
    const getIcon = (type) => {
        if(type == "Clear") {
            return WiDaySunny;
        }
        if(type == "Snow") {
            return WiSnow;
        }
        if(type == "Clouds") {
            return WiDayCloudy;
        }
        if(type == "Rain") {
            return WiRain;
        }
        return 
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
          <h1   >Погода во Владивостоке</h1>

          <p>
            Описание: {weatherData.weather[0].description} <Icon as={getIcon(weatherData.weather[0].main)} />
          </p>
          <p>Температура: {weatherData.main.temp}°C</p>

          <p>Ощущается как: {weatherData.main.feels_like}°C</p>
          <p>Влажность: {weatherData.main.humidity}%</p>
          <p>Давление: {weatherData.main.pressure}</p>
          <p>Скорость ветра: {weatherData.wind.speed}м/с</p>
        </>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default Weather;
