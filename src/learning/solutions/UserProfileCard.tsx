import React from "react";

interface UserProfileCardProps {
  name: string;
  age: number;
  email: string;
  profilePicture: string;
  isOnline: boolean;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({
  name,
  age,
  email,
  profilePicture,
  isOnline,
}) => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "20px",
        maxWidth: "300px",
        margin: "10px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "15px" }}>
        <img
          src={profilePicture}
          alt={`${name}'s profile`}
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            objectFit: "cover",
            border: `3px solid ${isOnline ? "#28a745" : "#dc3545"}`,
          }}
        />
      </div>

      <div style={{ textAlign: "center" }}>
        <h3 style={{ margin: "10px 0", color: "#333" }}>{name}</h3>
        <p style={{ margin: "5px 0", color: "#666" }}>Age: {age}</p>
        <p style={{ margin: "5px 0", color: "#666" }}>{email}</p>

        <div
          style={{
            display: "inline-block",
            padding: "4px 8px",
            borderRadius: "12px",
            fontSize: "12px",
            fontWeight: "bold",
            backgroundColor: isOnline ? "#28a745" : "#dc3545",
            color: "white",
            marginTop: "10px",
          }}
        >
          {isOnline ? "🟢 Online" : "🔴 Offline"}
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
