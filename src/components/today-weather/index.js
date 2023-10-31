import { useEffect, useState } from "react";
import WeatherCard from "../weather-card";

function TodayWeather({ apiKey }) {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams({
      lang: "fr",
      q: "Lyon",
      appid: apiKey,
      units: "metric",
    });

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?${urlParams.toString()}`
    )
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        setWeatherData(data);
      });
  }, [apiKey]);

  return (
    <div className="section">
      <h1>Météo du Jour</h1>

      {isLoading ? (
        <p>Chargement...</p>
      ) : weatherData ? (
        <div className="grid">
          <WeatherCard
            city={weatherData?.name}
            temp={weatherData?.main.temp}
            description={weatherData?.weather[0].description}
            icon={weatherData?.weather[0].icon}
          />
        </div>
      ) : (
        <p>Aucune donnée.</p>
      )}
    </div>
  );
}

export default TodayWeather;
