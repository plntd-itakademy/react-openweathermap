import { useEffect, useState } from "react";
import WeatherCard from "../weather-card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./style.scss";
import clsx from "clsx";

function WeatherForecast({ apiKey }) {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [swiper, setSwiper] = useState(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const swiperSettings = {
    slidesPerView: 3,
    spaceBetween: 50,
  };

  useEffect(() => {
    const urlParams = new URLSearchParams({
      lang: "fr",
      q: "Lyon",
      appid: apiKey,
      units: "metric",
    });

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?${urlParams.toString()}`
    )
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        setWeatherData(data);
      });
  }, [apiKey]);

  const handleSlideChange = (swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <div className="section">
      <h1>Prévisions Météo</h1>

      {isLoading ? (
        <p>Chargement...</p>
      ) : weatherData && weatherData?.list.length > 0 ? (
        <div className="swiper-container">
          <div
            className={clsx("arrow left", isBeginning && "disabled")}
            onClick={() => swiper.slidePrev()}
          />

          <Swiper
            className="swiper"
            onSwiper={(swiper) => setSwiper(swiper)}
            onSlideChange={(swiper) => handleSlideChange(swiper)}
            {...swiperSettings}
          >
            {weatherData.list.map((el, i) => (
              <SwiperSlide key={i}>
                <WeatherCard
                  date={el?.dt_txt}
                  city={weatherData.city.name}
                  temp={el?.main.temp}
                  description={el?.weather[0].description}
                  icon={el?.weather[0].icon}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div
            className={clsx("arrow right", isEnd && "disabled")}
            onClick={() => swiper.slideNext()}
          />
        </div>
      ) : (
        <p>Aucune donnée.</p>
      )}
    </div>
  );
}

export default WeatherForecast;
