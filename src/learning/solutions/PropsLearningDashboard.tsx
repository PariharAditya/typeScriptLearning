import React, { useState } from "react";
import UserProfileGallery from "./UserProfileGallery";
import ButtonShowcase from "./ButtonShowcase";
import CardExamples from "./CardExamples";

const PropsLearningDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"profiles" | "buttons" | "cards">(
    "profiles"
  );

  const tabStyle = (isActive: boolean): React.CSSProperties => ({
    padding: "10px 20px",
    backgroundColor: isActive ? "#007bff" : "#f8f9fa",
    color: isActive ? "white" : "#333",
    border: "1px solid #007bff",
    borderRadius: "4px",
    cursor: "pointer",
    margin: "0 5px",
    fontSize: "14px",
    fontWeight: "bold",
  });

  const renderContent = () => {
    switch (activeTab) {
      case "profiles":
        return <UserProfileGallery />;
      case "buttons":
        return <ButtonShowcase />;
      case "cards":
        return <CardExamples />;
      default:
        return <UserProfileGallery />;
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <header
        style={{
          backgroundColor: "#343a40",
          color: "white",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h1 style={{ margin: "0 0 10px 0", fontSize: "2.5em" }}>
          React + TypeScript Props Learning
        </h1>
        <p style={{ margin: "0", fontSize: "1.2em", opacity: 0.9 }}>
          Lesson 2: Props & Component Communication
        </p>
      </header>

      <nav
        style={{
          backgroundColor: "white",
          padding: "15px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <button
          onClick={() => setActiveTab("profiles")}
          style={tabStyle(activeTab === "profiles")}
        >
          User Profiles
        </button>
        <button
          onClick={() => setActiveTab("buttons")}
          style={tabStyle(activeTab === "buttons")}
        >
          Custom Buttons
        </button>
        <button
          onClick={() => setActiveTab("cards")}
          style={tabStyle(activeTab === "cards")}
        >
          Card Examples
        </button>
      </nav>

      <main>{renderContent()}</main>

      <footer
        style={{
          backgroundColor: "#343a40",
          color: "white",
          padding: "20px",
          textAlign: "center",
          marginTop: "40px",
        }}
      >
        <p style={{ margin: "0" }}>
          🎉 Excellent work on Props! Next up: State Management with useState
          Hook
        </p>
      </footer>
    </div>
  );
};

export default PropsLearningDashboard;
