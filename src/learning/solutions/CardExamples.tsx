import React from "react";
import Card from "./Card";

const CardExamples: React.FC = () => {
  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "30px", color: "#333" }}>
        Card Component Examples
      </h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <Card title="Welcome Card" subtitle="This is a basic card example">
          <p>
            This card contains simple text content. Cards are great for
            organizing content into digestible sections.
          </p>
          <button
            style={{
              padding: "8px 16px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Learn More
          </button>
        </Card>

        <Card title="User Profile" backgroundColor="#e3f2fd">
          <div style={{ textAlign: "center" }}>
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
              alt="User avatar"
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                marginBottom: "10px",
              }}
            />
            <h4 style={{ margin: "10px 0" }}>John Doe</h4>
            <p style={{ margin: "5px 0" }}>Software Developer</p>
            <p style={{ margin: "5px 0", color: "#666" }}>john@example.com</p>
          </div>
        </Card>

        <Card
          title="Statistics"
          subtitle="Monthly overview"
          backgroundColor="#fff3e0"
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Users:</span>
              <strong>1,234</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Sales:</span>
              <strong>$45,678</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Growth:</span>
              <strong style={{ color: "#28a745" }}>+12.5%</strong>
            </div>
          </div>
        </Card>

        <Card
          title="Todo List"
          subtitle="Things to do today"
          backgroundColor="#f3e5f5"
        >
          <ul style={{ paddingLeft: "20px" }}>
            <li style={{ marginBottom: "5px" }}>✅ Complete React tutorial</li>
            <li style={{ marginBottom: "5px" }}>
              ⏳ Review TypeScript concepts
            </li>
            <li style={{ marginBottom: "5px" }}>📝 Write documentation</li>
            <li style={{ marginBottom: "5px" }}>🎯 Plan next sprint</li>
          </ul>
        </Card>

        <Card
          title="News Article"
          subtitle="Latest updates"
          backgroundColor="#e8f5e8"
        >
          <div>
            <img
              src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&h=150&fit=crop"
              alt="News"
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                borderRadius: "4px",
                marginBottom: "10px",
              }}
            />
            <p style={{ fontSize: "14px", color: "#666", lineHeight: "1.4" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div style={{ marginTop: "10px", fontSize: "12px", color: "#999" }}>
              Published 2 hours ago
            </div>
          </div>
        </Card>

        <Card title="Contact Form" backgroundColor="#fce4ec">
          <form
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <input
              type="text"
              placeholder="Your Name"
              style={{
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
            />
            <input
              type="email"
              placeholder="Your Email"
              style={{
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
            />
            <textarea
              placeholder="Your Message"
              rows={3}
              style={{
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                resize: "vertical",
              }}
            />
            <button
              type="submit"
              style={{
                padding: "10px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Send Message
            </button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default CardExamples;
