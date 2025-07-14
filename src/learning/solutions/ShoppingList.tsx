import React from "react";

const ShoppingList: React.FC = () => {
  const groceryItems: string[] = [
    "Milk",
    "Bread",
    "Eggs",
    "Apples",
    "Bananas",
    "Chicken breast",
    "Rice",
    "Pasta",
  ];

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
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
        My Shopping List
      </h2>
      <ul
        style={{
          listStyleType: "none",
          padding: 0,
        }}
      >
        {groceryItems.map((item, index) => (
          <li
            key={index}
            style={{
              padding: "8px 16px",
              margin: "5px 0",
              backgroundColor: "#fff",
              borderRadius: "4px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              borderLeft: "4px solid #007bff",
            }}
          >
            {item}
          </li>
        ))}
      </ul>
      <p
        style={{
          textAlign: "center",
          marginTop: "20px",
          color: "#666",
          fontSize: "14px",
        }}
      >
        Total items: {groceryItems.length}
      </p>
    </div>
  );
};

export default ShoppingList;
