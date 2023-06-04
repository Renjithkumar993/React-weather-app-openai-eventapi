import React, { useState } from "react";
import { motion } from "framer-motion";
import Card from "react-bootstrap/Card";

const Dayforcast = ({ forecastData, isOn }) => {
  const [expandedDayIndex, setExpandedDayIndex] = useState(-1);

  if (!forecastData || forecastData.length === 0) {
    return <div>No forecast data available</div>;
  }

  const filteredData = forecastData.slice(0, 5 * 8);
  const groupedData = [];
  for (let i = 0; i < filteredData.length; i += 8) {
    groupedData.push(filteredData.slice(i, i + 8));
  }

  const toggleDayExpansion = (index) => {
    setExpandedDayIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  return (
    <div className="mt-5">
      <Card
        className={`col-12 col-md-12 thingstoDo ${
          isOn ? "dark-mode" : "lightmode"
        }`}
        style={{ borderRadius: "30px" }}
      >
        <Card.Header>Next 5 days</Card.Header>
        <Card.Body>
          <div className="d-flex flex-wrap justify-content-between">
            {groupedData.map((dayData, index) => (
              <motion.div
                className="col-12 col-md-3"
                key={index}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  className={`card ${isOn ? "dark-mode" : "light-mode"}`}
                  style={{ borderRadius: "30px", backgroundColor: "skyblue" }}
                >
                  <img
                    src={`http://openweathermap.org/img/w/${dayData[0].weather[0].icon}.png`}
                    alt="Weather Icon"
                    style={{ width: "100px", margin: "10px auto" }}
                  />
                  <Card.Body>
                    <h5 className="card-title">
                      Day {index + 1}:{" "}
                      {new Date(dayData[0].dt * 1000).toLocaleDateString()}
                    </h5>
                    <p className="card-text">
                      Time:{" "}
                      {new Date(dayData[0].dt * 1000).toLocaleTimeString()}
                    </p>
                    <p className="card-text">
                      Temperature: {dayData[0].main.temp}°C
                    </p>
                    <p className="card-text">
                      Weather: {dayData[0].weather[0].description}
                    </p>
                    <button
                      className="btn btn-primary"
                      onClick={() => toggleDayExpansion(index)}
                    >
                      Show Hourly Data
                    </button>
                  </Card.Body>
                </Card>
              </motion.div>
            ))}
          </div>

          {expandedDayIndex !== -1 && (
            <div className="row">
              <Card
                className={`col-12 col-md-12 thingstoDo ${
                  isOn ? "dark-mode" : "lightmode"
                }`}
                style={{ borderRadius: "30px" }}
              >
                <Card.Header>hourly Weather</Card.Header>
                <Card.Body>
                  <motion.div
                    className="d-flex col-12 flex-wrap"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    {groupedData[expandedDayIndex].map((data, idx) => (
                      <motion.div
                        className="card col-12 col-md-3"
                        key={idx}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        style={{
                          borderRadius: "30px",
                          backgroundColor: "skyblue",
                        }}
                      >
                        <Card
                          className={`card ${isOn ? "dark-mode" : "light-mode"}`}
                          style={{
                            borderRadius: "20px",
                            backgroundColor: "skyblue",
                          }}
                        >
                          <img
                            src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                            alt="Weather Icon"
                            style={{ width: "100px", margin: "10px auto" }}
                          />
                          <Card.Body className="">
                            <h5 className="card-title">
                              {new Date(data.dt * 1000).toLocaleDateString()}
                            </h5>
                            <p className="card-text">
                              Time:{" "}
                              {new Date(data.dt * 1000).toLocaleTimeString()}
                            </p>
                            <p className="card-text">
                              Temperature: {data.main.temp}°C
                            </p>
                            <p className="card-text">
                              Weather: {data.weather[0].description}
                            </p>
                          </Card.Body>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </Card.Body>
              </Card>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Dayforcast;
