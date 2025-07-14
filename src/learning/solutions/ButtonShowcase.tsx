import React from "react";
import CustomButton from "./CustomButton";

const ButtonShowcase: React.FC = () => {
  const handleButtonClick = (message: string) => {
    alert(message);
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f8f9fa",
        borderRadius: "8px",
        maxWidth: "800px",
        margin: "20px auto",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#333" }}>
        Custom Button Showcase
      </h2>

      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ color: "#555", marginBottom: "10px" }}>Variants</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          <CustomButton
            text="Primary Button"
            onClick={() => handleButtonClick("Primary button clicked!")}
            variant="primary"
            size="medium"
          />
          <CustomButton
            text="Secondary Button"
            onClick={() => handleButtonClick("Secondary button clicked!")}
            variant="secondary"
            size="medium"
          />
          <CustomButton
            text="Danger Button"
            onClick={() => handleButtonClick("Danger button clicked!")}
            variant="danger"
            size="medium"
          />
        </div>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ color: "#555", marginBottom: "10px" }}>Sizes</h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <CustomButton
            text="Small"
            onClick={() => handleButtonClick("Small button clicked!")}
            variant="primary"
            size="small"
          />
          <CustomButton
            text="Medium"
            onClick={() => handleButtonClick("Medium button clicked!")}
            variant="primary"
            size="medium"
          />
          <CustomButton
            text="Large"
            onClick={() => handleButtonClick("Large button clicked!")}
            variant="primary"
            size="large"
          />
        </div>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ color: "#555", marginBottom: "10px" }}>Disabled State</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          <CustomButton
            text="Disabled Primary"
            onClick={() => handleButtonClick("This should not fire!")}
            variant="primary"
            size="medium"
            disabled={true}
          />
          <CustomButton
            text="Disabled Secondary"
            onClick={() => handleButtonClick("This should not fire!")}
            variant="secondary"
            size="medium"
            disabled={true}
          />
          <CustomButton
            text="Disabled Danger"
            onClick={() => handleButtonClick("This should not fire!")}
            variant="danger"
            size="medium"
            disabled={true}
          />
        </div>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ color: "#555", marginBottom: "10px" }}>Mixed Examples</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          <CustomButton
            text="Save"
            onClick={() => handleButtonClick("Data saved!")}
            variant="primary"
            size="small"
          />
          <CustomButton
            text="Cancel"
            onClick={() => handleButtonClick("Action cancelled!")}
            variant="secondary"
            size="small"
          />
          <CustomButton
            text="Delete Account"
            onClick={() => handleButtonClick("Account deleted!")}
            variant="danger"
            size="large"
          />
        </div>
      </div>
    </div>
  );
};

export default ButtonShowcase;
