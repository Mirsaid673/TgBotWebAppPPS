import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, HStack, VStack } from "@chakra-ui/react";

const Weather = () => {React

 useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=Vladivostok&units=metric&appid=897e706da5f342fa4c61141ac9dad97c`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
 }, []);

 return (
    <div>
      {weatherData ? (
        <>
          <h2>Weather in Vladivostok</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Description: {weatherData.weather[0].description}</p>
          <p>Feels like: {weatherData.main.feels_like}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Pressure: {weatherData.main.pressure}</p>
          <p>Wind Speed: {weatherData.wind.speed}m/s</p>
        </>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
 );
};

export default Weather;
