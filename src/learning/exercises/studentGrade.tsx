import { JSX } from "react";
import "../../App.css"

function Grade({ marks }: { marks: string }): JSX.Element {
    switch (marks) {
        case 'A':
            return <span style={{ color: 'green' }}>Excellent! 🎉</span>;
        case 'B':
            return <span style={{ color: 'blue' }}>Good job! 👍</span>;
        case 'C':
            return <span style={{ color: 'yellow' }}>Average 📚</span>;
        case 'D':
            return <span style={{ color: 'orange' }}>Needs improvement 📖</span>;
        case 'F':
            return <span style={{ color: 'red' }}>Failed ❌</span>;
        default:
            return <span style={{ color: 'gray' }}>Invalid grade</span>;
    }
}

export function StudentGrade({ name, grade }: { name: string; grade: number }) {
  return (
    <div className="card">
      <h2>Student Grade</h2>
      <p>
        <strong>Name:</strong> {name}
      </p>
      <p>
        <strong>Grade:</strong>{" "}
        <Grade marks={String.fromCharCode(65 + grade)} />
      </p>
    </div>
  );
}
