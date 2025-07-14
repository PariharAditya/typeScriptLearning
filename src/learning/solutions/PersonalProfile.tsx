import React from "react";

const PersonalProfile: React.FC = () => {
  const name = "Aditya";
  const age = 22;
  const favoriteLanguage = "TypeScript";
  const currentDateTime = new Date().toLocaleString();

  return (
    <div
      style={{
        padding: "20px",
        border: "2px solid #007bff",
        borderRadius: "8px",
        backgroundColor: "#f8f9fa",
        maxWidth: "400px",
        margin: "20px auto",
      }}
    >
      <h2 style={{ color: "#007bff", textAlign: "center" }}>
        Personal Profile
      </h2>
      <div style={{ fontSize: "16px", lineHeight: "1.6" }}>
        <p>
          <strong>Name:</strong> {name}
        </p>
        <p>
          <strong>Age:</strong> {age} years old
        </p>
        <p>
          <strong>Favorite Language:</strong> {favoriteLanguage}
        </p>
        <p>
          <strong>Current Date & Time:</strong> {currentDateTime}
        </p>
      </div>
    </div>
  );
};

export default PersonalProfile;
