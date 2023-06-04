import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import WeatherCard from "./WeatherCard";
import {
  search,
  searchForecast,
  searchCurrent,
  searchSuggestion,
  searchEvent,
} from "../utils/app";
import Dayforcast from "./Dayforcast";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { Fade } from "react-awesome-reveal";
import "./main.css";
import Suggestion from "./Suggestion";
import Navbar from "./Navbar";
import { motion } from "framer-motion";
import ClockDiv from "./Clock";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Events from "./Events";





const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">hi there !</Popover.Header>
      <Popover.Body>
       Please choose  <strong>city</strong> from below and start searching
      </Popover.Body>
    </Popover>
  );
  






export default function Hero() {
  const [city, setCity] = useState("");
  const [result, setResult] = useState([]);
  const [currentWeather, setCurrentWeather] = useState("");
  const [fiveDayFOrcast, setFivedayForcast] = useState(null);
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [isOn, setIsOn] = useState(false);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [events , setEvent] = useState([])

  const renderPage = () => {
    if (currentPage === "home") {
      return (
        <div>
          <div
            className="d-flex justify-content-between flex-wrap align-items-center"
            style={{ marginTop: "20px" }}
          >
            {currentWeather && (
              <WeatherCard weatherData={currentWeather} isOn={isOn} />
            )}
            {loading ? (
              <div className="spinnner mx-auto mt-4">
                <h4> we are looking for suggestions</h4>
                <Spinner
                  animation="border"
                  variant="primary"
                  className="mx-auto"
                  style={{ marginTop: "60px" }}
                ></Spinner>
              </div>
            ) : (
              suggestion && (
                <Suggestion
                  suggestionData={suggestion}
                  isOn={isOn}
                  city={city}
                />
              )
            )}
          </div>
        </div>
      );
    }
    if (currentPage === "5day") {
      return (
        <div>
          {fiveDayFOrcast && (
            <Dayforcast forecastData={fiveDayFOrcast} isOn={isOn} />
          )}
        </div>
      );
    }
    if (currentPage === "video") {
      return <Events events = {events} isOn={isOn}/>
    }
  };

  const handlePageChange = (page) => setCurrentPage(page);

  const getCityName = (e) => {
    setCity(e.target.value);
    setPopoverVisible(true)
    if(!e.target.value){
        setPopoverVisible(false)
    }
  };

  const searchWeather = async (query) => {
    if (!query || query.length === 0) {
    } else {
      const response = await search(query);
      setResult(response.data);
    }
  };

  const getLatandLon = async (e) => {
    e.preventDefault();
    const selectedCity = result.find(
      (item) => item.name + ", " + item.country === city
    );

    if (selectedCity) {
      try {
        const response = await searchForecast(
          selectedCity.lat,
          selectedCity.lon
        );

        const currentWeatherResponse = await searchCurrent(city);
        const currentWeatherData = currentWeatherResponse.data;
        setCurrentWeather(currentWeatherData);
        setFivedayForcast(response.data.list);
        setPopoverVisible(false)

        const responseEvent = await searchEvent(city);
        const responsedata =  responseEvent;

            setEvent(responsedata)
    
        



        setLoading(true);
        const suggestion = await searchSuggestion(city, currentWeatherData);
        const suggestionData = suggestion;
        setSuggestion(suggestionData);
        setLoading(false);

     
      } catch (error) {
        console.log("Error occurred while fetching data:", error);
      }
    }
  };


  useEffect(() => {
    searchWeather(city);
  }, [city]);

  const handleCityClick = async (clickedCity) => {
    setCity(clickedCity.name + ", " + clickedCity.country);
  };
  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
  };

  const toggleSwitch = () => setIsOn(!isOn);

  return (
    <div className="container-fluid text-black mt-5">
      <div
        className={`col-12 container ${
          isOn ? "dark-mode" : "light-mode"
        } bg-light`}
        style={{ borderRadius: "50px" }}
      >
        <div
          className="col-md-12 text-center mx-auto"
          style={{ paddingTop: "10px" }}
        >
          <h1>Welcome to the Weather App</h1>
          <p>
            Explore the world's weather conditions with our real-time weather
            app. Plan your day with confidence by getting accurate and
            up-to-date weather information for any location around the globe.
            Our AI integration provides personalized suggestions and
            recommendations based on the current weather conditions, ensuring
            you make the most of your day.
          </p>
          <form className="search-bar p-5" onSubmit={getLatandLon}>
  <input
    type="text"
    name="location"
    placeholder="Enter a location"
    value={city}
    onChange={getCityName}
    className="p-3"
    style={{ borderRadius: "15px" }}
  />

  {popoverVisible && (
    <OverlayTrigger
      placement="right"
      overlay={popover}
      show={popoverVisible}
      onHide={() => setPopoverVisible(false)}
      trigger="manual"
    >
      <input
        type="submit"
        value="Search"
        style={{ padding: "15px", borderRadius: "15px" }}
      />
    </OverlayTrigger>
  )}

  {!popoverVisible && (
    <input
      type="submit"
      value="Search"
      style={{ padding: "15px", borderRadius: "15px" }}
      onClick={() => setPopoverVisible(true)}
    />
  )}
</form>


          <div className="justify-content-between d-flex align-items-center">
            <div>
              <ClockDiv isOn={isOn} />
            </div>
            <div className="justify-content-center">
              {city && result.map((item, index) => (
                <Fade cascade damping={1} key={index}>
                  <Button
                    className="m-2"
                    onClick={() => handleCityClick(item)}
                    variant="secondary"
                    size="md"
                  >
                    {item.name}, {item.country}
                  </Button>
                </Fade>
              ))}
            </div>
  
            <div
              className={`switch ${isOn ? "dark-mode" : "light-mode"}`}
              data-isOn={isOn}
              onClick={toggleSwitch}
            >
              <motion.div className="handle" layout transition={spring} />
            </div>
          </div>

     { currentWeather &&  <Navbar
            currentPage={currentPage}
            city={city}
            handlePageChange={handlePageChange}
          />}
          {/* Here we are calling the renderPage method which will return a component  */}
          {renderPage()}
        </div>
      </div>
    </div>
  );
}
