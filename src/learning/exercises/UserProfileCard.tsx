import React from "react";
import "../../App.css";

interface UserProfileCardProps {
  name: string;
  age: number;
  email: string;
  profilePictureUrl: string;
  isOnline: boolean;
}

export const UserProfile: React.FC<UserProfileCardProps> = ({
  name,
  age,
  email,
  profilePictureUrl,
  isOnline,
}) => {
  return (
    <div className="card user-profile-card">
      <div className="profile-header">
        <img
          src={profilePictureUrl}
          alt={`${name}'s profile`}
          className="profile-picture"
        />
        <div
          className={`status-indicator ${isOnline ? "online" : "offline"}`}
        ></div>
      </div>
      <div className="profile-content">
        <h2 className="user-name">{name}</h2>
        <div className="user-details">
          <p className="user-info">
            <span className="info-label">Age:</span>
            <span className="info-value">{age}</span>
          </p>
          <p className="user-info">
            <span className="info-label">Email:</span>
            <span className="info-value">{email}</span>
          </p>
          <div
            className={`user-status ${
              isOnline ? "status-online" : "status-offline"
            }`}
          >
            <span className="status-dot"></span>
            {isOnline ? "Online" : "Offline"}
          </div>
        </div>
      </div>
    </div>
  );
};
