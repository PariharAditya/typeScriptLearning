import React from "react";

const MathDisplay: React.FC = () => {
  const num1: number = 15;
  const num2: number = 4;

  const addition = num1 + num2;
  const subtraction = num1 - num2;
  const multiplication = num1 * num2;
  const division =
    num2 !== 0 ? (num1 / num2).toFixed(2) : "Cannot divide by zero";

  const operationStyle: React.CSSProperties = {
    padding: "10px",
    margin: "5px 0",
    backgroundColor: "#f8f9fa",
    borderRadius: "4px",
    borderLeft: "4px solid #007bff",
  };

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#fff",
        maxWidth: "400px",
        margin: "20px auto",
      }}
    >
      <h2
        style={{
          color: "#333",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Math Calculator Display
      </h2>

      <div
        style={{
          backgroundColor: "#e9ecef",
          padding: "15px",
          borderRadius: "6px",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: "18px", margin: "5px 0" }}>
          <strong>Numbers:</strong> {num1} and {num2}
        </p>
      </div>

      <div>
        <div style={operationStyle}>
          <strong>Addition:</strong> {num1} + {num2} = {addition}
        </div>

        <div style={operationStyle}>
          <strong>Subtraction:</strong> {num1} - {num2} = {subtraction}
        </div>

        <div style={operationStyle}>
          <strong>Multiplication:</strong> {num1} × {num2} = {multiplication}
        </div>

        <div style={operationStyle}>
          <strong>Division:</strong> {num1} ÷ {num2} = {division}
        </div>
      </div>

      {num2 === 0 && (
        <div
          style={{
            marginTop: "15px",
            padding: "10px",
            backgroundColor: "#f8d7da",
            color: "#721c24",
            borderRadius: "4px",
            textAlign: "center",
          }}
        >
          ⚠️ Warning: Division by zero is not allowed!
        </div>
      )}
    </div>
  );
};

export default MathDisplay;
