import { useEffect, useState } from "react";
import WeatherCard from "../weather-card";

function WeatherPosition({ apiKey }) {
  const [weatherData, setWeatherData] = useState(null);
  const [position, setPosition] = useState(null);
  const [positionError, setPositionError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const success = (pos) => {
      setPosition(pos.coords);
    };

    const error = (err) => {
      let error = "";

      switch (err.code) {
        case 1:
          error = "Localisation refusée.";
          break;

        case 2:
          error = "Localisation indisponible.";
          break;

        default:
          error = "Délai d'expération atteint.";
          break;
      }

      setPositionError(error);
    };

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  useEffect(() => {
    if (!position) return;

    const urlParams = new URLSearchParams({
      lang: "fr",
      lat: position.latitude,
      lon: position.longitude,
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
  }, [apiKey, position]);

  return (
    <div className="section">
      <h1>Météo Selon la Position</h1>

      {positionError ? (
        <p>{positionError}</p>
      ) : isLoading ? (
        <p>Chargement...</p>
      ) : weatherData ? (
        <div className="grid">
          <WeatherCard
            city={weatherData.name}
            temp={weatherData.main.temp}
            description={weatherData.weather[0].description}
            icon={weatherData.weather[0].icon}
          />
        </div>
      ) : (
        <p>Aucune donnée.</p>
      )}
    </div>
  );
}

export default WeatherPosition;
