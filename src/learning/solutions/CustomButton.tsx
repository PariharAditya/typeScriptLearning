import React from "react";

type ButtonVariant = "primary" | "secondary" | "danger";
type ButtonSize = "small" | "medium" | "large";

interface CustomButtonProps {
  text: string;
  onClick: () => void;
  variant: ButtonVariant;
  size: ButtonSize;
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  onClick,
  variant,
  size,
  disabled = false,
}) => {
  const getVariantStyles = (variant: ButtonVariant): React.CSSProperties => {
    switch (variant) {
      case "primary":
        return {
          backgroundColor: disabled ? "#ccc" : "#007bff",
          color: "white",
          border: "1px solid #007bff",
        };
      case "secondary":
        return {
          backgroundColor: disabled ? "#f8f9fa" : "#6c757d",
          color: disabled ? "#ccc" : "white",
          border: "1px solid #6c757d",
        };
      case "danger":
        return {
          backgroundColor: disabled ? "#f8f9fa" : "#dc3545",
          color: disabled ? "#ccc" : "white",
          border: "1px solid #dc3545",
        };
      default:
        return {};
    }
  };

  const getSizeStyles = (size: ButtonSize): React.CSSProperties => {
    switch (size) {
      case "small":
        return {
          padding: "4px 8px",
          fontSize: "12px",
        };
      case "medium":
        return {
          padding: "8px 16px",
          fontSize: "14px",
        };
      case "large":
        return {
          padding: "12px 24px",
          fontSize: "16px",
        };
      default:
        return {};
    }
  };

  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{
        ...getVariantStyles(variant),
        ...getSizeStyles(size),
        borderRadius: "4px",
        cursor: disabled ? "not-allowed" : "pointer",
        fontWeight: "bold",
        transition: "all 0.2s ease",
        margin: "5px",
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.opacity = "0.8";
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.opacity = "1";
        }
      }}
    >
      {text}
    </button>
  );
};

export default CustomButton;
