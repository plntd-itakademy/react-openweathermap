import "./App.scss";
import TodayWeather from "./components/today-weather";
import WeatherForecast from "./components/weather-forecast";
import WeatherPosition from "./components/weather-position";

function App() {
  const apiKey = "8282b82999e90310a40a2fc4dc8b98c1";

  return (
    <div className="app">
      <TodayWeather apiKey={apiKey} />
      <WeatherForecast apiKey={apiKey} />
      <WeatherPosition apiKey={apiKey} />
    </div>
  );
}

export default App;
