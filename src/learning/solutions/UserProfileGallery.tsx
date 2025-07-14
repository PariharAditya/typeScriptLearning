import React from "react";
import UserProfileCard from "./UserProfileCard";

const UserProfileGallery: React.FC = () => {
  const users = [
    {
      name: "Alice Johnson",
      age: 28,
      email: "alice@example.com",
      profilePicture:
        "https://images.unsplash.com/photo-1494790108755-2616b8c3c4e8?w=150&h=150&fit=crop&crop=face",
      isOnline: true,
    },
    {
      name: "Bob Smith",
      age: 35,
      email: "bob@example.com",
      profilePicture:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      isOnline: false,
    },
    {
      name: "Carol Davis",
      age: 23,
      email: "carol@example.com",
      profilePicture:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      isOnline: true,
    },
  ];

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "30px", color: "#333" }}>
        User Profile Gallery
      </h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {users.map((user, index) => (
          <UserProfileCard
            key={index}
            name={user.name}
            age={user.age}
            email={user.email}
            profilePicture={user.profilePicture}
            isOnline={user.isOnline}
          />
        ))}
      </div>
    </div>
  );
};

export default UserProfileGallery;
