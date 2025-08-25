import React, { useState } from "react";

interface SkillAssessment {
  category: string;
  questions: Question[];
}

interface Question {
  id: string;
  question: string;
  type: "multiple-choice" | "code-review" | "practical";
  options?: string[];
  correctAnswer?: number;
  code?: string;
  explanation: string;
}

interface AssessmentResult {
  category: string;
  score: number;
  maxScore: number;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  recommendations: string[];
}

const SkillAssessmentTool: React.FC = () => {
  const [currentAssessment, setCurrentAssessment] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [results, setResults] = useState<AssessmentResult[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);

  const assessments: SkillAssessment[] = [
    {
      category: "React Fundamentals",
      questions: [
        {
          id: "react-1",
          question:
            "What is the correct way to update state that depends on previous state?",
          type: "multiple-choice",
          options: [
            "setCount(count + 1)",
            "setCount(prev => prev + 1)",
            "setState({count: count + 1})",
            "this.setState({count: this.state.count + 1})",
          ],
          correctAnswer: 1,
          explanation:
            "Using functional updates ensures you get the latest state value, preventing stale closure issues.",
        },
        {
          id: "react-2",
          question:
            "Which hook would you use to perform side effects in a functional component?",
          type: "multiple-choice",
          options: ["useState", "useEffect", "useContext", "useReducer"],
          correctAnswer: 1,
          explanation:
            "useEffect is specifically designed for side effects like API calls, subscriptions, and DOM manipulation.",
        },
        {
          id: "react-3",
          question: "What is wrong with this code?",
          type: "code-review",
          code: `
function TodoList() {
  const [todos, setTodos] = useState([]);
  
  const addTodo = (text) => {
    todos.push({ id: Date.now(), text, completed: false });
    setTodos(todos);
  };
  
  return <div>...</div>;
}`,
          options: [
            "Missing useState import",
            "Mutating state directly",
            "Using Date.now() for ID",
            "Missing return statement",
          ],
          correctAnswer: 1,
          explanation:
            "You should never mutate state directly. Use setTodos([...todos, newTodo]) or functional update.",
        },
      ],
    },
    {
      category: "TypeScript with React",
      questions: [
        {
          id: "ts-1",
          question: "What is the correct way to type a React component props?",
          type: "multiple-choice",
          options: [
            "interface Props { name: string }; const Comp = (props: Props) => {}",
            "const Comp: React.FC<{name: string}> = ({name}) => {}",
            "Both A and B are correct",
            "const Comp = ({name}: {name: string}) => {}",
          ],
          correctAnswer: 2,
          explanation:
            "All approaches are valid, though interface + React.FC is often preferred for reusability.",
        },
        {
          id: "ts-2",
          question: "How do you type an event handler in TypeScript?",
          type: "multiple-choice",
          options: [
            "onClick: (event: Event) => void",
            "onClick: (event: React.MouseEvent) => void",
            "onClick: (event: React.MouseEvent<HTMLButtonElement>) => void",
            "onClick: MouseEventHandler",
          ],
          correctAnswer: 2,
          explanation:
            "React.MouseEvent<HTMLButtonElement> provides the most specific typing for button click events.",
        },
        {
          id: "ts-3",
          question:
            'What does this type utility do: Pick<User, "name" | "email">?',
          type: "multiple-choice",
          options: [
            "Creates a new type with only name and email from User",
            "Removes name and email from User type",
            "Makes name and email optional in User",
            "Creates a union type of name and email",
          ],
          correctAnswer: 0,
          explanation:
            "Pick utility type creates a new type by selecting specific properties from an existing type.",
        },
      ],
    },
    {
      category: "Production Best Practices",
      questions: [
        {
          id: "prod-1",
          question: "When should you use React.memo?",
          type: "multiple-choice",
          options: [
            "For every component to optimize performance",
            "Only for components that receive primitive props",
            "For components that re-render frequently with same props",
            "Never, it always makes things slower",
          ],
          correctAnswer: 2,
          explanation:
            "React.memo should be used when a component re-renders frequently but often receives the same props.",
        },
        {
          id: "prod-2",
          question:
            "What is the best practice for handling API errors in React?",
          type: "multiple-choice",
          options: [
            "Use try-catch in every component",
            "Create error boundaries and consistent error handling hooks",
            "Log errors to console only",
            "Show generic error message for all errors",
          ],
          correctAnswer: 1,
          explanation:
            "Error boundaries catch rendering errors, while custom hooks can handle async errors consistently.",
        },
        {
          id: "prod-3",
          question:
            "Which pattern is best for sharing state between many components?",
          type: "multiple-choice",
          options: [
            "Prop drilling through all components",
            "Global variables",
            "Context API or state management library",
            "Local storage for everything",
          ],
          correctAnswer: 2,
          explanation:
            "Context API or libraries like Redux provide clean, maintainable state sharing patterns.",
        },
      ],
    },
  ];

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const nextQuestion = () => {
    const assessment = assessments[currentAssessment];
    if (currentQuestion < assessment.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else if (currentAssessment < assessments.length - 1) {
      setCurrentAssessment((prev) => prev + 1);
      setCurrentQuestion(0);
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    const calculatedResults: AssessmentResult[] = assessments.map(
      (assessment) => {
        let score = 0;
        assessment.questions.forEach((question) => {
          const userAnswer = answers[question.id];
          if (
            question.type === "multiple-choice" &&
            userAnswer === question.correctAnswer
          ) {
            score++;
          }
        });

        const percentage = (score / assessment.questions.length) * 100;
        let level: AssessmentResult["level"];
        let recommendations: string[];

        if (percentage >= 90) {
          level = "Expert";
          recommendations = [
            "Take on advanced production projects",
            "Mentor other developers",
            "Contribute to open source projects",
            "Focus on architecture and system design",
          ];
        } else if (percentage >= 75) {
          level = "Advanced";
          recommendations = [
            "Work on complex production projects",
            "Focus on performance optimization",
            "Learn advanced patterns and architecture",
            "Practice with large-scale applications",
          ];
        } else if (percentage >= 50) {
          level = "Intermediate";
          recommendations = [
            "Practice state management patterns",
            "Build medium-complexity projects",
            "Focus on TypeScript mastery",
            "Learn testing and debugging techniques",
          ];
        } else {
          level = "Beginner";
          recommendations = [
            "Complete basic React tutorials",
            "Practice with simple components",
            "Focus on useState and useEffect",
            "Build small projects to reinforce learning",
          ];
        }

        return {
          category: assessment.category,
          score,
          maxScore: assessment.questions.length,
          level,
          recommendations,
        };
      }
    );

    setResults(calculatedResults);
    setShowResults(true);
  };

  const resetAssessment = () => {
    setCurrentAssessment(0);
    setCurrentQuestion(0);
    setAnswers({});
    setResults([]);
    setShowResults(false);
  };

  if (showResults) {
    return (
      <div
        style={{
          padding: "30px",
          maxWidth: "800px",
          margin: "20px auto",
          backgroundColor: "#f8f9fa",
          borderRadius: "12px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#007bff",
            marginBottom: "30px",
          }}
        >
          🎯 Your Skill Assessment Results
        </h1>

        {results.map((result, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "8px",
              border: "1px solid #ddd",
            }}
          >
            <h3 style={{ color: "#333", marginBottom: "10px" }}>
              {result.category}
            </h3>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
              <span
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color:
                    result.level === "Expert"
                      ? "#28a745"
                      : result.level === "Advanced"
                      ? "#007bff"
                      : result.level === "Intermediate"
                      ? "#ffc107"
                      : "#dc3545",
                }}
              >
                {result.score}/{result.maxScore} (
                {Math.round((result.score / result.maxScore) * 100)}%)
              </span>
              <span
                style={{
                  marginLeft: "15px",
                  padding: "4px 12px",
                  borderRadius: "12px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  backgroundColor:
                    result.level === "Expert"
                      ? "#d4edda"
                      : result.level === "Advanced"
                      ? "#cce5ff"
                      : result.level === "Intermediate"
                      ? "#fff3cd"
                      : "#f8d7da",
                  color:
                    result.level === "Expert"
                      ? "#155724"
                      : result.level === "Advanced"
                      ? "#004085"
                      : result.level === "Intermediate"
                      ? "#856404"
                      : "#721c24",
                }}
              >
                {result.level}
              </span>
            </div>

            <h4 style={{ color: "#555", marginBottom: "10px" }}>
              Recommended Next Steps:
            </h4>
            <ul style={{ color: "#666", lineHeight: "1.6" }}>
              {result.recommendations.map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          </div>
        ))}

        <div
          style={{
            backgroundColor: "#e9ecef",
            padding: "20px",
            borderRadius: "8px",
            marginTop: "30px",
          }}
        >
          <h3 style={{ color: "#333", marginBottom: "15px" }}>
            📚 Personalized Learning Path
          </h3>

          {results.some((r) => r.level === "Beginner") && (
            <div style={{ marginBottom: "15px" }}>
              <strong>🎯 Focus Areas:</strong> Complete the basic lessons first,
              then move to simple exercises
            </div>
          )}

          {results.some((r) => r.level === "Intermediate") && (
            <div style={{ marginBottom: "15px" }}>
              <strong>🚀 Recommended:</strong> Start with Daily Challenges (Week
              1-2)
            </div>
          )}

          {results.some((r) => r.level === "Advanced") && (
            <div style={{ marginBottom: "15px" }}>
              <strong>💪 Ready For:</strong> Production Projects and Daily
              Challenges (Week 3-4)
            </div>
          )}
        </div>

        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <button
            onClick={resetAssessment}
            style={{
              padding: "12px 24px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            Retake Assessment
          </button>

          <button
            onClick={() =>
              window.open("/learning/exercises/daily-challenges.md", "_blank")
            }
            style={{
              padding: "12px 24px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Start Challenges
          </button>
        </div>
      </div>
    );
  }

  const currentAssessmentData = assessments[currentAssessment];
  const currentQuestionData = currentAssessmentData.questions[currentQuestion];
  const progress =
    ((currentAssessment * 3 + currentQuestion + 1) / (assessments.length * 3)) *
    100;

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "600px",
        margin: "20px auto",
        backgroundColor: "#f8f9fa",
        borderRadius: "12px",
      }}
    >
      <h1
        style={{ textAlign: "center", color: "#007bff", marginBottom: "20px" }}
      >
        🎯 React + TypeScript Skill Assessment
      </h1>

      <div
        style={{
          backgroundColor: "#e9ecef",
          borderRadius: "10px",
          height: "8px",
          marginBottom: "20px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            backgroundColor: "#007bff",
            height: "100%",
            width: `${progress}%`,
            transition: "width 0.3s ease",
          }}
        />
      </div>

      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          border: "1px solid #ddd",
          marginBottom: "20px",
        }}
      >
        <h3 style={{ color: "#333", marginBottom: "15px" }}>
          {currentAssessmentData.category} - Question {currentQuestion + 1} of{" "}
          {currentAssessmentData.questions.length}
        </h3>

        <p
          style={{ fontSize: "18px", lineHeight: "1.5", marginBottom: "20px" }}
        >
          {currentQuestionData.question}
        </p>

        {currentQuestionData.code && (
          <pre
            style={{
              backgroundColor: "#f8f9fa",
              padding: "15px",
              borderRadius: "4px",
              fontSize: "14px",
              overflow: "auto",
              marginBottom: "20px",
              border: "1px solid #ddd",
            }}
          >
            <code>{currentQuestionData.code}</code>
          </pre>
        )}

        {currentQuestionData.type === "multiple-choice" && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {currentQuestionData.options?.map((option, index) => (
              <label
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px",
                  backgroundColor:
                    answers[currentQuestionData.id] === index
                      ? "#cce5ff"
                      : "#f8f9fa",
                  borderRadius: "4px",
                  cursor: "pointer",
                  border: "1px solid #ddd",
                }}
              >
                <input
                  type="radio"
                  name={currentQuestionData.id}
                  value={index}
                  checked={answers[currentQuestionData.id] === index}
                  onChange={() => handleAnswer(currentQuestionData.id, index)}
                  style={{ marginRight: "10px" }}
                />
                {option}
              </label>
            ))}
          </div>
        )}
      </div>

      <div style={{ textAlign: "center" }}>
        <button
          onClick={nextQuestion}
          disabled={answers[currentQuestionData.id] === undefined}
          style={{
            padding: "12px 24px",
            backgroundColor:
              answers[currentQuestionData.id] !== undefined
                ? "#007bff"
                : "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            cursor:
              answers[currentQuestionData.id] !== undefined
                ? "pointer"
                : "not-allowed",
          }}
        >
          {currentAssessment === assessments.length - 1 &&
          currentQuestion === currentAssessmentData.questions.length - 1
            ? "View Results"
            : "Next Question"}
        </button>
      </div>
    </div>
  );
};

export default SkillAssessmentTool;
