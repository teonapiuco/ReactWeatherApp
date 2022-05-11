import React, { useState } from "react";
import { hot } from "react-hot-loader";
import axios from "axios";
import { WiStrongWind, WiHumidity, WiGaleWarning } from "react-icons/wi";
function App() {
  const [data, setData] = useState({});
  const [city, setCity] = useState("");
  const { getName } = require("country-list");

  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(URL).then((response) => {
        setData(response.data);
      });
      setCity("");
    }
  };
  return (
    <main className="app">
      <div className="search">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter City Name"
          type="text"
        />
      </div>
      <div className="container">
        <header>
          <div>
            {data.sys ? (
              <h1>
                {data.name}, {getName(data.sys.country)}
              </h1>
            ) : null}
          </div>
          <div>
            {data.main ? (
              <h3>Current temperature {data.main.temp.toFixed()}°C</h3>
            ) : null}
            {data.main ? (
              <p>Minimum temperature {data.main.temp_min.toFixed()}°C</p>
            ) : null}
            {data.main ? (
              <p>Maximum temperature {data.main.temp_max.toFixed()}°C</p>
            ) : null}
          </div>
        </header>
        <div className="description">
          {data.weather ? <h3>{data.weather[0].description}</h3> : null}
        </div>
        <footer>
          <div>
            {data.main ? (
              <p>
                <p>
                  <WiHumidity /> Humidity
                </p>
                {data.main.humidity}%
              </p>
            ) : null}
          </div>
          <div>
            {data.main ? (
              <p>
                <p>
                  <WiGaleWarning /> Feels Like
                </p>
                {data.main.feels_like.toFixed()}°C
              </p>
            ) : null}
          </div>
          <div>
            {data.wind ? (
              <p>
                <p>
                  <WiStrongWind />
                  Wind Speed
                </p>
                {data.wind.speed.toFixed()} MPH
              </p>
            ) : null}
          </div>
        </footer>
      </div>
    </main>
  );
}
export default hot(module)(App);
