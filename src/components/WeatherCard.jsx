import React, { useState } from 'react';
import { Card,Image,Button } from 'react-bootstrap';

import { motion, AnimatePresence } from 'framer-motion';

const WeatherCard = ({ weatherData , isOn }) => {




  const { name, main, weather, wind } = weatherData;
  if (!weatherData) {
    return null;
  }
  const getWeatherIconURL = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}.png`;
  };

  return (
    <div className="col-12 col-md-4 ">
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >     



<Card className={`text-center ${isOn ? "dark-mode" : "light-mode"}`} id="currentweather" style={{ borderRadius: "40px" }}>
  <Card.Header>Current Weather</Card.Header>
  <Card.Body style={{ display: "flex", alignItems: "center" }}>
    <div style={{ flex: "0 0 150px", marginRight: "20px" }}>
      <img
        src={getWeatherIconURL(weather[0].icon)}
        alt="Weather Icon"
        className="weather-icon"
        style={{ width: "100%" }}
      />
    </div>
    <div style={{ textAlign: "left" }}>
      <Card.Title>{name}</Card.Title>
      <Card.Text>Temperature: {main.temp}°C</Card.Text>
      <Card.Text>Feels Like: {main.feels_like}°C</Card.Text>
      <Card.Text>Wind Speed: {wind.speed} m/s</Card.Text>
      <Card.Text> {weather[0].description}</Card.Text>
    </div>
  </Card.Body>
</Card>

  </motion.div>
  </div>
  );
};

export default WeatherCard;
