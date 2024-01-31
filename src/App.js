import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import { useState } from "react";
import axios from 'axios';

function App() {

      const apiKey = "398a6b32aeb8a5577d5ca979a52fb2b8"
      const [inputCity, setInputCity] = useState("")
      const [ data, setData ] = useState({})
      const [isCelsius, setIsCelsius] = useState(true);


    const getWetherDetails = (cityName) => {
    if (!cityName) return
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey
    axios.get(apiURL).then((res) => {
      console.log("response", res.data)
      setData(res.data)
    }).catch((err) => {
      console.log("err", err)
    })
  }

  const handleChangeInput = (e) => {
    console.log("value", e.target.value)
    setInputCity(e.target.value)
  }

  const handleSearch = () => {
    getWetherDetails(inputCity)
  }

   // Function to convert Celsius to Fahrenheit
  const celsiusToFahrenheit = (celsius) => {
    return (celsius * 9 / 5) + 32;
  };

  // Function to handle toggling between Celsius and Fahrenheit
  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };


  return (
    <div className="col-md-12">
      <div className="wetherBg">
        <h1 className="heading">Weather App</h1>

        <div className="d-grid gap-3 col-4 mt-4">
          <input type="text" className="form-control"
            value={inputCity}
            onChange={handleChangeInput} />
          <button className="btn btn-primary" type="button"
            onClick={handleSearch}
          >Search</button>
        </div>
      

      {Object.keys(data).length > 0 &&
        <div className="col-md-12 text-center mt-5">

          <div className="shadow rounded wetherResultBox">
            <img className="weathorIcon" alt="weatherIcon"
              src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png" />

            <h5 className="weathorCity">
              {data?.name}
            </h5>
            <h6 className="weathorTemp"> <h2>Current Temperature: {isCelsius ? ((data?.main?.temp) - 273.15).toFixed(2) + "°C" : celsiusToFahrenheit(((data?.main?.temp) - 273.15).toFixed(2)).toFixed(2) + "°F"}</h2></h6>
            
            <h6 className="humidity">Humidity: {(data?.main?.humidity)}%
            
            </h6>
            <h6 className="TempMin">Min. Temp: {isCelsius ? ((data?.main?.temp_min) - 273.15).toFixed(2) + "°C" : celsiusToFahrenheit(((data?.main?.temp_min) - 273.15).toFixed(2)).toFixed(2) + "°F"},
             Max. Temp: {isCelsius ? ((data?.main?.temp_max) - 273.15).toFixed(2) + "°C" : celsiusToFahrenheit(((data?.main?.temp_max) - 273.15).toFixed(2)).toFixed(2) + "°F"}</h6>
           
            <h6 className="wind-dir">Wind direction: {(data?.wind?.deg)}°</h6>
            <h6 className="wind-speed">Wind Speed: {(data?.wind?.speed)}mph</h6>
            <button className="toggle" onClick={toggleTemperatureUnit}>Toggle Unit</button>
          </div>
        </div>
      }

    </div>
    </div>
  );
}

export default App;
