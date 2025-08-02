import React, { useEffect, useRef, useState } from "react";
import "./weather.css";
import searchicon from "../assets/search.png";
import cloudyicon from "../assets/cloudy.png";
import drizzyicon from "../assets/drizzy.png";
import humidityicon from "../assets/humidity.png";
import rainicon from "../assets/rain.png";
import sunicon from "../assets/sun.png";
import windicon from "../assets/wind.png";
import snowicon from "../assets/snow.png";

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);
  const allIcons = {
    "01d": sunicon,
    "01n": sunicon,
    "02d": cloudyicon,
    "02n": cloudyicon,
    "03d": cloudyicon,
    "03n": cloudyicon,
    "04d": drizzyicon,
    "04n": drizzyicon,
    "09d": rainicon,
    "09n": rainicon,
    "10d": rainicon,
    "10n": rainicon,
    "13d": snowicon,
    "13n": snowicon,
  };

  const search = async (city) => {
    if (city === "") {
      alert("Enter a city name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const icon = allIcons[data.weather[0].icon];
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.log("error in getting weather data");
    }
  };

  useEffect(() => {
    search("london");
  }, []);
  return (
    <div className="weather">
      <div className="search-bar">
        <input type="text" placeholder="Search" ref={inputRef} />
        <img
          src={searchicon}
          alt="search"
          onClick={() => search(inputRef.current.value)}
        />
      </div>
      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="" className="weatherIcon" />
          <p className="temperature">{weatherData.temperature}c</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img
                src={humidityicon}
                alt=""
                style={{ background: "white", borderRadius: "5px" }}
              />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={windicon} alt="" />
              <div>
                <p>{weatherData.windSpeed}km/h</p>
                <span>Wind speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;
