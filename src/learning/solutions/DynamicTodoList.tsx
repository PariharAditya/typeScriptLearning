import React, { useState } from "react";

type Priority = "low" | "medium" | "high";
type FilterStatus = "all" | "completed" | "pending";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  priority: Priority;
}

const DynamicTodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Learn React useState", completed: true, priority: "high" },
    {
      id: 2,
      text: "Practice TypeScript",
      completed: false,
      priority: "medium",
    },
    { id: 3, text: "Build a todo app", completed: false, priority: "high" },
  ]);

  const [inputText, setInputText] = useState<string>("");
  const [selectedPriority, setSelectedPriority] = useState<Priority>("medium");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [filterPriority, setFilterPriority] = useState<Priority | "all">("all");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");

  const addTodo = () => {
    if (inputText.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputText.trim(),
        completed: false,
        priority: selectedPriority,
      };
      setTodos((prev) => [...prev, newTodo]);
      setInputText("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const startEditing = (id: number, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = (id: number) => {
    if (editText.trim()) {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, text: editText.trim() } : todo
        )
      );
    }
    setEditingId(null);
    setEditText("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const filteredTodos = todos.filter((todo) => {
    const statusMatch =
      filterStatus === "all" ||
      (filterStatus === "completed" && todo.completed) ||
      (filterStatus === "pending" && !todo.completed);

    const priorityMatch =
      filterPriority === "all" || todo.priority === filterPriority;

    return statusMatch && priorityMatch;
  });

  const getPriorityColor = (priority: Priority): string => {
    switch (priority) {
      case "high":
        return "#dc3545";
      case "medium":
        return "#ffc107";
      case "low":
        return "#28a745";
    }
  };

  const getPriorityEmoji = (priority: Priority): string => {
    switch (priority) {
      case "high":
        return "🔴";
      case "medium":
        return "🟡";
      case "low":
        return "🟢";
    }
  };

  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div
      style={{
        padding: "30px",
        border: "2px solid #007bff",
        borderRadius: "12px",
        backgroundColor: "#f8f9fa",
        maxWidth: "600px",
        margin: "20px auto",
      }}
    >
      <h2
        style={{ color: "#007bff", marginBottom: "20px", textAlign: "center" }}
      >
        Dynamic Todo List
      </h2>

      {/* Stats */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
          padding: "15px",
          backgroundColor: "#e9ecef",
          borderRadius: "6px",
        }}
      >
        <span>
          <strong>Total:</strong> {totalCount}
        </span>
        <span>
          <strong>Completed:</strong> {completedCount}
        </span>
        <span>
          <strong>Pending:</strong> {totalCount - completedCount}
        </span>
      </div>

      {/* Add Todo Form */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          padding: "15px",
          backgroundColor: "#fff",
          borderRadius: "6px",
          border: "1px solid #ddd",
        }}
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter new todo..."
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ddd",
            fontSize: "16px",
          }}
          onKeyPress={(e) => e.key === "Enter" && addTodo()}
        />
        <select
          value={selectedPriority}
          onChange={(e) => setSelectedPriority(e.target.value as Priority)}
          style={{
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ddd",
            fontSize: "16px",
          }}
        >
          <option value="low">🟢 Low</option>
          <option value="medium">🟡 Medium</option>
          <option value="high">🔴 High</option>
        </select>
        <button
          onClick={addTodo}
          disabled={!inputText.trim()}
          style={{
            padding: "10px 20px",
            backgroundColor: inputText.trim() ? "#28a745" : "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: inputText.trim() ? "pointer" : "not-allowed",
            fontSize: "16px",
          }}
        >
          Add
        </button>
      </div>

      {/* Filters */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "20px",
          padding: "15px",
          backgroundColor: "#fff",
          borderRadius: "6px",
          border: "1px solid #ddd",
          alignItems: "center",
        }}
      >
        <div>
          <label style={{ marginRight: "5px", fontWeight: "bold" }}>
            Status:
          </label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
            style={{
              padding: "5px",
              borderRadius: "4px",
              border: "1px solid #ddd",
            }}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <div>
          <label style={{ marginRight: "5px", fontWeight: "bold" }}>
            Priority:
          </label>
          <select
            value={filterPriority}
            onChange={(e) =>
              setFilterPriority(e.target.value as Priority | "all")
            }
            style={{
              padding: "5px",
              borderRadius: "4px",
              border: "1px solid #ddd",
            }}
          >
            <option value="all">All</option>
            <option value="high">🔴 High</option>
            <option value="medium">🟡 Medium</option>
            <option value="low">🟢 Low</option>
          </select>
        </div>
        <span style={{ color: "#666", fontSize: "14px" }}>
          Showing {filteredTodos.length} of {totalCount} todos
        </span>
      </div>

      {/* Todo List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {filteredTodos.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
              color: "#6c757d",
              fontSize: "18px",
            }}
          >
            {todos.length === 0
              ? "No todos yet. Add one above!"
              : "No todos match your filters."}
          </div>
        ) : (
          filteredTodos.map((todo) => (
            <div
              key={todo.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "15px",
                backgroundColor: "#fff",
                borderRadius: "6px",
                border: "1px solid #ddd",
                opacity: todo.completed ? 0.7 : 1,
              }}
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: todo.completed ? "#28a745" : "#6c757d",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
              >
                {todo.completed ? "✓" : "○"}
              </button>

              <span
                style={{
                  fontSize: "18px",
                  marginRight: "5px",
                }}
              >
                {getPriorityEmoji(todo.priority)}
              </span>

              {editingId === todo.id ? (
                <div style={{ display: "flex", gap: "5px", flex: 1 }}>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    style={{
                      flex: 1,
                      padding: "5px",
                      borderRadius: "4px",
                      border: "1px solid #ddd",
                    }}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") saveEdit(todo.id);
                      if (e.key === "Escape") cancelEdit();
                    }}
                    autoFocus
                  />
                  <button
                    onClick={() => saveEdit(todo.id)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#28a745",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    ✓
                  </button>
                  <button
                    onClick={cancelEdit}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#dc3545",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <>
                  <span
                    style={{
                      flex: 1,
                      textDecoration: todo.completed ? "line-through" : "none",
                      fontSize: "16px",
                      cursor: "pointer",
                    }}
                    onClick={() => startEditing(todo.id, todo.text)}
                  >
                    {todo.text}
                  </span>

                  <span
                    style={{
                      fontSize: "12px",
                      color: getPriorityColor(todo.priority),
                      fontWeight: "bold",
                      padding: "2px 6px",
                      backgroundColor: getPriorityColor(todo.priority) + "20",
                      borderRadius: "3px",
                    }}
                  >
                    {todo.priority.toUpperCase()}
                  </span>

                  <button
                    onClick={() => deleteTodo(todo.id)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#dc3545",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "12px",
                    }}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DynamicTodoList;
