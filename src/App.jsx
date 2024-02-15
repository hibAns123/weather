import { useState,useEffect } from 'react'

import './App.css'

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const apiKey = '8ac5c4d57ba6a4b3dfcf622700447b1e';

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    if (city.trim() !== '') {
      fetchWeatherData();
    }
  }, [city]); // Fetch weather data whenever the city changes

  return (
    <div className='background-container'>
              <h1 style={{textAlign:'center'}}>WEATHER FORECAST</h1>

     <div className='container d-flex justify-content-center align-items-center'>
        <input style={{border:'0px', padding:'10px'}}
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleInputChange}
        />
        {weatherData ? (
          <div  style={{marginTop:'10px', padding:'10px'}}>
            <h1 style={{color:'rgb(65, 64, 100)'}}>{weatherData.name}</h1>
            
            <h1 style={{color:'rgb(65, 64, 100)'}}>Temperature: {weatherData.main.temp}°C</h1>
            <h3>Humidity: {weatherData.main.humidity}%</h3>
            <h3>Wind Speed: {weatherData.wind.speed} m/s</h3>
            <h4>{weatherData.weather[0].description}</h4>
          </div>
        ) : (
          <p>Please enter a city name</p>
        )}
      </div>
     </div>
  );
};

export default App
