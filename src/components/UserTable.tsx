// UserTable Component - Think of this like your Thymeleaf template or JSP
// This displays data in a table format, just like your web views

import React from "react";
import { User } from "../types/User";

/**
 * UserTable Component - Your View Layer
 *
 * Spring Boot equivalent:
 * - Thymeleaf template with th:each="user : ${users}"
 * - Or JSP with <c:forEach items="${users}" var="user">
 * - Or RESTful JSON response displayed in frontend
 *
 * This component:
 * - Displays paginated user data (like your data tables)
 * - Handles user actions (edit, delete)
 * - Shows status badges (like your enum display logic)
 */

interface UserTableProps {
  users: User[];
  loading: boolean;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

export const UserTable: React.FC<UserTableProps> = ({
  users,
  loading,
  onEdit,
  onDelete,
}) => {
  /**
   * Get role badge styling (like your enum display methods)
   *
   * Spring Boot equivalent:
   * public String getRoleDisplayClass(UserRole role) {
   *   switch (role) {
   *     case ADMIN: return "badge-admin";
   *     // ...
   *   }
   * }
   */
  const getRoleBadgeStyle = (role: User["role"]) => {
    const baseStyle = {
      padding: "4px 8px",
      borderRadius: "12px",
      fontSize: "12px",
      fontWeight: "bold" as const,
      textTransform: "uppercase" as const,
    };

    switch (role) {
      case "admin":
        return {
          ...baseStyle,
          backgroundColor: "#e3f2fd",
          color: "#1976d2",
          border: "1px solid #bbdefb",
        };
      case "moderator":
        return {
          ...baseStyle,
          backgroundColor: "#fff3e0",
          color: "#f57c00",
          border: "1px solid #ffcc02",
        };
      case "user":
        return {
          ...baseStyle,
          backgroundColor: "#f3e5f5",
          color: "#7b1fa2",
          border: "1px solid #ce93d8",
        };
      default:
        return baseStyle;
    }
  };

  /**
   * Get status badge styling (like your status enum display)
   */
  const getStatusBadgeStyle = (status: User["status"]) => {
    const baseStyle = {
      padding: "4px 8px",
      borderRadius: "12px",
      fontSize: "12px",
      fontWeight: "bold" as const,
      textTransform: "uppercase" as const,
    };

    switch (status) {
      case "active":
        return {
          ...baseStyle,
          backgroundColor: "#e8f5e8",
          color: "#2e7d32",
          border: "1px solid #a5d6a7",
        };
      case "inactive":
        return {
          ...baseStyle,
          backgroundColor: "#fff3cd",
          color: "#856404",
          border: "1px solid #ffeaa7",
        };
      case "suspended":
        return {
          ...baseStyle,
          backgroundColor: "#f8d7da",
          color: "#721c24",
          border: "1px solid #f5c6cb",
        };
      default:
        return baseStyle;
    }
  };

  /**
   * Format date (like your @DateTimeFormat or LocalDateTime display)
   */
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  /**
   * Format last login with relative time
   */
  const formatLastLogin = (lastLogin?: string): string => {
    if (!lastLogin) return "Never";

    const date = new Date(lastLogin);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;

    return formatDate(lastLogin);
  };

  /**
   * Handle delete with confirmation (like your @PreRemove validation)
   */
  const handleDelete = (user: User) => {
    const confirmMessage = `Are you sure you want to delete ${user.firstName} ${user.lastName}?\n\nThis action cannot be undone.`;

    if (window.confirm(confirmMessage)) {
      onDelete(user.id);
    }
  };

  // Loading state (like your "Loading..." spinner)
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
          fontSize: "16px",
          color: "#666",
        }}
      >
        <div
          style={{
            width: "20px",
            height: "20px",
            border: "2px solid #f3f3f3",
            borderTop: "2px solid #2196f3",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            marginRight: "12px",
          }}
        ></div>
        Loading users...
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  // Empty state (like your "No records found" message)
  if (users.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "40px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          border: "1px solid #dee2e6",
        }}
      >
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>👥</div>
        <h3 style={{ color: "#495057", marginBottom: "8px" }}>
          No users found
        </h3>
        <p style={{ color: "#6c757d", marginBottom: 0 }}>
          Try adjusting your search criteria or add a new user.
        </p>
      </div>
    );
  }

  // Main table (like your Thymeleaf table)
  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "8px",
        border: "1px solid #dee2e6",
        overflow: "hidden",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "14px",
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: "#f8f9fa",
              borderBottom: "2px solid #dee2e6",
            }}
          >
            <th
              style={{
                padding: "16px 12px",
                textAlign: "left",
                fontWeight: "600",
                color: "#495057",
                fontSize: "13px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              ID
            </th>
            <th
              style={{
                padding: "16px 12px",
                textAlign: "left",
                fontWeight: "600",
                color: "#495057",
                fontSize: "13px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              User
            </th>
            <th
              style={{
                padding: "16px 12px",
                textAlign: "left",
                fontWeight: "600",
                color: "#495057",
                fontSize: "13px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Email
            </th>
            <th
              style={{
                padding: "16px 12px",
                textAlign: "left",
                fontWeight: "600",
                color: "#495057",
                fontSize: "13px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Role
            </th>
            <th
              style={{
                padding: "16px 12px",
                textAlign: "left",
                fontWeight: "600",
                color: "#495057",
                fontSize: "13px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Status
            </th>
            <th
              style={{
                padding: "16px 12px",
                textAlign: "left",
                fontWeight: "600",
                color: "#495057",
                fontSize: "13px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Created
            </th>
            <th
              style={{
                padding: "16px 12px",
                textAlign: "left",
                fontWeight: "600",
                color: "#495057",
                fontSize: "13px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Last Login
            </th>
            <th
              style={{
                padding: "16px 12px",
                textAlign: "center",
                fontWeight: "600",
                color: "#495057",
                fontSize: "13px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user.id}
              style={{
                borderBottom: "1px solid #dee2e6",
                backgroundColor: index % 2 === 0 ? "#ffffff" : "#f8f9fa",
                transition: "background-color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  "#e3f2fd";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  index % 2 === 0 ? "#ffffff" : "#f8f9fa";
              }}
            >
              <td
                style={{
                  padding: "16px 12px",
                  color: "#6c757d",
                  fontWeight: "500",
                }}
              >
                #{user.id}
              </td>

              <td style={{ padding: "16px 12px" }}>
                <div>
                  <div
                    style={{
                      fontWeight: "600",
                      color: "#212529",
                      marginBottom: "2px",
                    }}
                  >
                    {user.firstName} {user.lastName}
                  </div>
                </div>
              </td>

              <td
                style={{
                  padding: "16px 12px",
                  color: "#495057",
                }}
              >
                {user.email}
              </td>

              <td style={{ padding: "16px 12px" }}>
                <span style={getRoleBadgeStyle(user.role)}>{user.role}</span>
              </td>

              <td style={{ padding: "16px 12px" }}>
                <span style={getStatusBadgeStyle(user.status)}>
                  {user.status}
                </span>
              </td>

              <td
                style={{
                  padding: "16px 12px",
                  color: "#6c757d",
                }}
              >
                {formatDate(user.createdAt)}
              </td>

              <td
                style={{
                  padding: "16px 12px",
                  color: "#6c757d",
                }}
              >
                {formatLastLogin(user.lastLogin)}
              </td>

              <td
                style={{
                  padding: "16px 12px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    justifyContent: "center",
                  }}
                >
                  <button
                    onClick={() => onEdit(user)}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#007bff",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "12px",
                      fontWeight: "500",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.backgroundColor =
                        "#0056b3";
                      (e.target as HTMLElement).style.transform =
                        "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.backgroundColor =
                        "#007bff";
                      (e.target as HTMLElement).style.transform =
                        "translateY(0)";
                    }}
                  >
                    ✏️ Edit
                  </button>

                  <button
                    onClick={() => handleDelete(user)}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#dc3545",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "12px",
                      fontWeight: "500",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.backgroundColor =
                        "#c82333";
                      (e.target as HTMLElement).style.transform =
                        "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.backgroundColor =
                        "#dc3545";
                      (e.target as HTMLElement).style.transform =
                        "translateY(0)";
                    }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
