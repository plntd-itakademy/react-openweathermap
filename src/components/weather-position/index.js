import { useEffect, useState } from "react";
import { useGeolocated } from "react-geolocated";
import WeatherCard from "../weather-card";

function WeatherPosition({ apiKey }) {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
      },
    });

  useEffect(() => {
    if (!coords) return;

    const urlParams = new URLSearchParams({
      lang: "fr",
      lat: coords.latitude,
      lon: coords.longitude,
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
  }, [apiKey, coords]);

  return (
    <div className="section">
      <h1>Météo Selon la Position</h1>

      {!isGeolocationAvailable ? (
        <p>La géolocalisation n'est pas supportée par votre navigateur.</p>
      ) : !isGeolocationEnabled ? (
        <p>La géolocalisation n'est pas activée.</p>
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
