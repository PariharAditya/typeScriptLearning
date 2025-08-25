import React, { useState } from "react";
import InteractiveCounter from "./InteractiveCounter";
import UserRegistrationForm from "./UserRegistrationForm";
import DynamicTodoList from "./DynamicTodoList";

type ExerciseTab = "counter" | "form" | "todo" | "overview";

const StateExercisesDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ExerciseTab>("overview");

  const exercises = [
    {
      id: "counter" as ExerciseTab,
      title: "Interactive Counter",
      description: "Learn basic useState with numbers and functional updates",
      component: <InteractiveCounter />,
      concepts: [
        "useState basics",
        "Functional updates",
        "Event handling",
        "Number state",
      ],
    },
    {
      id: "form" as ExerciseTab,
      title: "Registration Form",
      description: "Complex form state management with validation",
      component: <UserRegistrationForm />,
      concepts: [
        "Object state",
        "Form validation",
        "Conditional rendering",
        "TypeScript interfaces",
      ],
    },
    {
      id: "todo" as ExerciseTab,
      title: "Dynamic Todo List",
      description: "Array state management with CRUD operations",
      component: <DynamicTodoList />,
      concepts: [
        "Array state",
        "CRUD operations",
        "Filtering",
        "Editing state",
      ],
    },
  ];

  const renderOverview = () => (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#f8f9fa",
        borderRadius: "12px",
        margin: "20px 0",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#007bff",
          marginBottom: "30px",
          fontSize: "2.5em",
        }}
      >
        🎯 Lesson 3: State Management with useState
      </h1>

      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "30px",
          border: "1px solid #ddd",
        }}
      >
        <h2 style={{ color: "#333", marginBottom: "15px" }}>
          📚 What You'll Learn
        </h2>
        <ul style={{ lineHeight: "1.8", fontSize: "16px", color: "#555" }}>
          <li>
            <strong>useState Hook Fundamentals</strong> - Managing state in
            functional components
          </li>
          <li>
            <strong>State Update Patterns</strong> - Functional updates vs
            direct updates
          </li>
          <li>
            <strong>Complex State Types</strong> - Objects, arrays, and nested
            state
          </li>
          <li>
            <strong>Form State Management</strong> - Controlled inputs and
            validation
          </li>
          <li>
            <strong>TypeScript with State</strong> - Type-safe state management
          </li>
          <li>
            <strong>Event Handling</strong> - Responding to user interactions
          </li>
        </ul>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        {exercises.map((exercise) => (
          <div
            key={exercise.id}
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
            onClick={() => setActiveTab(exercise.id)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
            }}
          >
            <h3 style={{ color: "#007bff", marginBottom: "10px" }}>
              {exercise.title}
            </h3>
            <p
              style={{ color: "#666", marginBottom: "15px", lineHeight: "1.5" }}
            >
              {exercise.description}
            </p>
            <div>
              <strong style={{ color: "#333", fontSize: "14px" }}>
                Key Concepts:
              </strong>
              <div style={{ marginTop: "5px" }}>
                {exercise.concepts.map((concept, index) => (
                  <span
                    key={index}
                    style={{
                      display: "inline-block",
                      backgroundColor: "#e9ecef",
                      color: "#495057",
                      padding: "2px 8px",
                      borderRadius: "12px",
                      fontSize: "12px",
                      margin: "2px",
                      fontWeight: "500",
                    }}
                  >
                    {concept}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          backgroundColor: "#d4edda",
          padding: "20px",
          borderRadius: "8px",
          border: "1px solid #c3e6cb",
        }}
      >
        <h3 style={{ color: "#155724", marginBottom: "10px" }}>
          💡 Pro Tips for Success
        </h3>
        <ul style={{ color: "#155724", lineHeight: "1.6" }}>
          <li>
            Always use functional updates when new state depends on previous
            state
          </li>
          <li>
            Don't mutate state directly - use spread operators for objects and
            arrays
          </li>
          <li>
            Keep state as simple as possible - use multiple useState hooks
            instead of one complex object
          </li>
          <li>Use TypeScript interfaces to define your state structure</li>
          <li>Test your components with edge cases and invalid inputs</li>
        </ul>
      </div>
    </div>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "20px",
      }}
    >
      {/* Navigation */}
      <div
        style={{
          backgroundColor: "#fff",
          padding: "15px",
          borderRadius: "8px",
          marginBottom: "20px",
          border: "1px solid #ddd",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <button
            onClick={() => setActiveTab("overview")}
            style={{
              padding: "10px 20px",
              backgroundColor: activeTab === "overview" ? "#007bff" : "#f8f9fa",
              color: activeTab === "overview" ? "white" : "#333",
              border: `1px solid ${
                activeTab === "overview" ? "#007bff" : "#ddd"
              }`,
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "500",
              transition: "all 0.2s ease",
            }}
          >
            📋 Overview
          </button>
          {exercises.map((exercise) => (
            <button
              key={exercise.id}
              onClick={() => setActiveTab(exercise.id)}
              style={{
                padding: "10px 20px",
                backgroundColor:
                  activeTab === exercise.id ? "#007bff" : "#f8f9fa",
                color: activeTab === exercise.id ? "white" : "#333",
                border: `1px solid ${
                  activeTab === exercise.id ? "#007bff" : "#ddd"
                }`,
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "500",
                transition: "all 0.2s ease",
              }}
            >
              {exercise.title}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div>
        {activeTab === "overview" && renderOverview()}
        {exercises.map(
          (exercise) =>
            activeTab === exercise.id && (
              <div key={exercise.id}>{exercise.component}</div>
            )
        )}
      </div>

      {/* Footer */}
      {activeTab !== "overview" && (
        <div
          style={{
            textAlign: "center",
            marginTop: "30px",
            padding: "20px",
            backgroundColor: "#343a40",
            color: "white",
            borderRadius: "8px",
          }}
        >
          <p style={{ margin: 0, fontSize: "16px" }}>
            🎉 Great job working with useState! Try the other exercises to
            master state management.
          </p>
          <button
            onClick={() => setActiveTab("overview")}
            style={{
              marginTop: "10px",
              padding: "8px 16px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Back to Overview
          </button>
        </div>
      )}
    </div>
  );
};

export default StateExercisesDashboard;
