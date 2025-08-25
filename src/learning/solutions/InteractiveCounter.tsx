import React, { useState } from "react";

const InteractiveCounter: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [stepSize, setStepSize] = useState<number>(1);

  const increment = () => {
    setCount((prev) => prev + stepSize);
  };

  const decrement = () => {
    setCount((prev) => prev - stepSize);
  };

  const reset = () => {
    setCount(0);
  };

  const handleStepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1;
    setStepSize(Math.max(1, value)); // Ensure step size is at least 1
  };

  return (
    <div
      style={{
        padding: "30px",
        border: "2px solid #007bff",
        borderRadius: "12px",
        backgroundColor: "#f8f9fa",
        maxWidth: "400px",
        margin: "20px auto",
        textAlign: "center",
      }}
    >
      <h2 style={{ color: "#007bff", marginBottom: "20px" }}>
        Interactive Counter
      </h2>

      <div
        style={{
          fontSize: "48px",
          fontWeight: "bold",
          color: count === 0 ? "#6c757d" : count > 0 ? "#28a745" : "#dc3545",
          margin: "20px 0",
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          border: "1px solid #ddd",
        }}
      >
        {count}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label
          style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
        >
          Step Size:
        </label>
        <input
          type="number"
          value={stepSize}
          onChange={handleStepChange}
          min="1"
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ddd",
            width: "80px",
            textAlign: "center",
            fontSize: "16px",
          }}
        />
      </div>

      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <button
          onClick={decrement}
          style={{
            padding: "12px 20px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#c82333")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#dc3545")
          }
        >
          -{stepSize}
        </button>

        <button
          onClick={reset}
          style={{
            padding: "12px 20px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#5a6268")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#6c757d")
          }
        >
          Reset
        </button>

        <button
          onClick={increment}
          style={{
            padding: "12px 20px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#218838")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#28a745")
          }
        >
          +{stepSize}
        </button>
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "10px",
          backgroundColor: "#e9ecef",
          borderRadius: "6px",
          fontSize: "14px",
          color: "#495057",
        }}
      >
        <strong>Info:</strong> Counter will{" "}
        {count >= 0 ? "increase" : "decrease"} by {stepSize} each click
      </div>
    </div>
  );
};

export default InteractiveCounter;
