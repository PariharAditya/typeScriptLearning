import React from "react";
import PersonalProfile from "./PersonalProfile";
import WeatherStatus from "./WeatherStatus";
import ShoppingList from "./ShoppingList";
import StudentGrade from "./StudentGrade";
import MathDisplay from "./MathDisplay";

const Dashboard: React.FC = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "20px",
      }}
    >
      <header
        style={{
          textAlign: "center",
          marginBottom: "30px",
          padding: "20px",
          backgroundColor: "#007bff",
          color: "white",
          borderRadius: "8px",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "2.5em" }}>
          React + TypeScript Learning Dashboard
        </h1>
        <p style={{ margin: "10px 0 0 0", fontSize: "1.2em" }}>
          Lesson 1: Components & JSX Exercise Solutions
        </p>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "20px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <PersonalProfile />
        <WeatherStatus />
        <ShoppingList />
        <StudentGrade />
        <MathDisplay />
      </div>

      <footer
        style={{
          textAlign: "center",
          marginTop: "40px",
          padding: "20px",
          backgroundColor: "#343a40",
          color: "white",
          borderRadius: "8px",
        }}
      >
        <p style={{ margin: 0 }}>
          Great job completing Lesson 1! 🎉 Ready for Lesson 2: Props &
          Component Communication?
        </p>
      </footer>
    </div>
  );
};

export default Dashboard;
