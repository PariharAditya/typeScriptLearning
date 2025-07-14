import React from "react";

const WeatherStatus: React.FC = () => {
  const temperature = 22; // Hardcoded temperature for now

  const getWeatherMessage = (temp: number): string => {
    if (temp > 25) {
      return "It's hot outside! 🌞";
    } else if (temp >= 15 && temp <= 25) {
      return "Perfect weather! 🌤️";
    } else {
      return "It's cold outside! 🥶";
    }
  };

  const getWeatherStyle = (temp: number): React.CSSProperties => {
    if (temp > 25) {
      return { color: "#ff6b35", backgroundColor: "#fff3cd" };
    } else if (temp >= 15 && temp <= 25) {
      return { color: "#28a745", backgroundColor: "#d4edda" };
    } else {
      return { color: "#007bff", backgroundColor: "#cce5ff" };
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        borderRadius: "8px",
        textAlign: "center",
        fontSize: "18px",
        fontWeight: "bold",
        maxWidth: "400px",
        margin: "20px auto",
        ...getWeatherStyle(temperature),
      }}
    >
      <h3>Weather Status</h3>
      <p>Current Temperature: {temperature}°C</p>
      <p>{getWeatherMessage(temperature)}</p>
    </div>
  );
};

export default WeatherStatus;
