import "./style.scss";

function WeatherCard({ date, city, temp, description, icon }) {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="card">
      {date && (
        <p className="date">
          {new Date(date).toLocaleDateString("fr-FR") +
            " " +
            new Date(date).toLocaleTimeString("fr-FR")}
        </p>
      )}
      <p className="city">{city}</p>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt="Icône météo"
        className="icon"
      />
      <p>{temp} °C</p>
      <p>{capitalizeFirstLetter(description)}</p>
    </div>
  );
}

export default WeatherCard;
