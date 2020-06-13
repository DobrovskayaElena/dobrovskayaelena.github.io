import React, { Component } from "react";
import "./App.css";

const PLACES = [
  { name: "Minsk", zip: "220000" },
  { name: "Brest", zip: "224000" },
  { name: "Vitebsk", zip: "210000" },
  { name: "Homel", zip: "246000" },
  { name: "Hrodna", zip: "230000" },
  { name: "Mahilyow", zip: "212000" }
];

class WeatherDisplay extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null
    };
  }
  componentDidMount() {
    const zip = this.props.zip;
    const URL = "http://api.openweathermap.org/data/2.5/weather?q=" +
      zip +
      "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=metric";
    fetch(URL).then(res => res.json()).then(json => {
      this.setState({ weatherData: json });
    });
  }
  render() {
    const weatherData = this.state.weatherData;
    if (!weatherData) return <div>Loading</div>;
    const weather = weatherData.weather[0];
    const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
    return (
      <div>
        <h1 className="App-city">
          {weatherData.name} <img src={iconUrl} alt={weatherData.description} />
        </h1>
        <h2 className="App-temperature">
          {weatherData.main.temp}°C
        </h2>
        <table align="center">
          <tr>
            <td>Local Time</td>
            <td>{new Date().toLocaleString()}</td>
          </tr>
          <tr>
            <td>Wind Speed</td>
            <td>{weatherData.wind.speed} m/s</td>
          </tr>
          <tr>
            <td>Clouds</td>
            <td>{weatherData.clouds.all} %</td>
          </tr>
          <tr>
            <td>Pressure</td>
            <td>{weatherData.main.pressure} hpa</td>
          </tr>
          <tr>
            <td>Humidity</td>
            <td>{weatherData.main.humidity} %</td>
          </tr>
          <tr>
            <td>Sunrise</td>
            <td>{new Date(weatherData.sys.sunrise * 1000).toLocaleString()}</td>
          </tr>
          <tr>
            <td>Sunset</td>
            <td>{new Date(weatherData.sys.sunset * 1000).toLocaleString()}</td>
          </tr>
        </table>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      activePlace: 0
    };
  }
  render() {
    const activePlace = this.state.activePlace;
    return (
      <div className="App">
        <h1 className="App-header">Weather forecast, BY</h1>
        <div className="">
          {PLACES.map((place, index) => (
            <button
              key={index}
              onClick={() => {
                this.setState({ activePlace: index });
              }}
            >
              {place.name}
            </button>
          ))}
          <WeatherDisplay key={activePlace} zip={PLACES[activePlace].zip} />
        </div>
      </div>
    );
  }
}

export default App;