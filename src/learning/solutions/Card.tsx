import React from "react";

interface CardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  backgroundColor?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  backgroundColor = "#fff",
}) => {
  return (
    <div
      style={{
        backgroundColor,
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "20px",
        margin: "10px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        maxWidth: "400px",
      }}
    >
      <div style={{ marginBottom: "15px" }}>
        <h3
          style={{
            margin: "0 0 5px 0",
            color: "#333",
            fontSize: "1.5em",
          }}
        >
          {title}
        </h3>
        {subtitle && (
          <p
            style={{
              margin: "0",
              color: "#666",
              fontSize: "0.9em",
              fontStyle: "italic",
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      <div>{children}</div>
    </div>
  );
};

export default Card;
