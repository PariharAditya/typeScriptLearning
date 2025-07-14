import React from "react";

type Grade = "A" | "B" | "C" | "D" | "F";

const StudentGrade: React.FC = () => {
  const studentName = "John Doe";
  const grade: Grade = "A"; // Change this to test different grades

  const getGradeInfo = (grade: Grade): { message: string; color: string } => {
    switch (grade) {
      case "A":
        return { message: "Excellent! 🎉", color: "#28a745" };
      case "B":
        return { message: "Good job! 👍", color: "#007bff" };
      case "C":
        return { message: "Average 📚", color: "#ffc107" };
      case "D":
        return { message: "Needs improvement 📖", color: "#fd7e14" };
      case "F":
        return { message: "Failed ❌", color: "#dc3545" };
      default:
        return { message: "Invalid grade", color: "#6c757d" };
    }
  };

  const gradeInfo = getGradeInfo(grade);

  return (
    <div
      style={{
        padding: "20px",
        border: "2px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#fff",
        maxWidth: "400px",
        margin: "20px auto",
        textAlign: "center",
      }}
    >
      <h2 style={{ color: "#333", marginBottom: "20px" }}>
        Student Grade Report
      </h2>

      <div
        style={{
          backgroundColor: "#f8f9fa",
          padding: "15px",
          borderRadius: "6px",
          marginBottom: "15px",
        }}
      >
        <p style={{ fontSize: "18px", margin: "10px 0" }}>
          <strong>Student:</strong> {studentName}
        </p>
        <p style={{ fontSize: "24px", margin: "10px 0" }}>
          <strong>Grade:</strong>
          <span
            style={{
              color: gradeInfo.color,
              marginLeft: "10px",
              fontWeight: "bold",
            }}
          >
            {grade}
          </span>
        </p>
      </div>

      <div
        style={{
          padding: "15px",
          backgroundColor: gradeInfo.color,
          color: "#fff",
          borderRadius: "6px",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        {gradeInfo.message}
      </div>
    </div>
  );
};

export default StudentGrade;
