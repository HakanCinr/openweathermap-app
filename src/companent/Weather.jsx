import axios from 'axios';
import React, { useEffect, useState } from 'react';


function Weather() {
  const [city, setCity] = useState("istanbul");
  const [weather, setWeather] = useState([]);

  const weatherData = () => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b60047aeaa7d7f41beeca07c9065e9c7&units=metric`)
      .then(res => {
        setWeather([res.data]);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        setWeather([]);
      });
  };

  useEffect(() => {
    weatherData();
  }, []);

  return (
    <>
      <label>Şehir :</label>
      <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
      <button onClick={()=>weatherData()}>Search</button>

      
        <div className="weather">
          <div className="weather-icon">
            {weather && weather.map(item => (
              <div key={item.id}>
                <h2>{item.name} Weather</h2>
                <p>Temperature: {item.main.temp} °C</p>
                <p>Humidity: {item.main.humidity}%</p>
                <p>Conditions: {item.weather[0].description}</p>
              </div>
            ))}
          </div>
        </div>      
        {weather.length === 0 && <p>Loading...</p>}
    </>
  );
}

export default Weather;
