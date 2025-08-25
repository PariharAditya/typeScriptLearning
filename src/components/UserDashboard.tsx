// UserDashboard - Your main controller, like Spring Boot's @Controller
// This orchestrates all the components, just like your MVC controllers

import React, { useState } from "react";
import { useUserAPI } from "../hooks/useUserAPI";
import { UserTable } from "./UserTable";
import { User } from "../types/User";

/**
 * UserDashboard Component - Your Main Controller
 *
 * Spring Boot equivalent:
 * @Controller
 * @RequestMapping("/users")
 * public class UserController {
 *
 *   @GetMapping
 *   public String listUsers(Model model, Pageable pageable) {
 *     // controller logic
 *   }
 * }
 *
 * This component:
 * - Manages overall page state
 * - Coordinates between components
 * - Handles user interactions
 * - Shows loading/error states
 */

export const UserDashboard: React.FC = () => {
  // Service layer (like @Autowired UserService)
  const {
    users,
    loading,
    error,
    pagination,
    createUser,
    updateUser,
    deleteUser,
    setPage,
    setSearch,
    clearError,
  } = useUserAPI();

  // Local component state (like Model attributes)
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>();

  // Event handlers (like your @RequestMapping methods)

  /**
   * Handle search input changes with debouncing
   * (Like your search functionality with @RequestParam)
   */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Simple debouncing (wait 300ms after user stops typing)
    setTimeout(() => {
      setSearch(value);
      setPage(1); // Reset to first page when searching
    }, 300);
  };

  /**
   * Handle edit user (like your edit endpoint)
   */
  const handleEditUser = (user: User) => {
    console.log("📝 Editing user:", user.email);
    setEditingUser(user);
    setShowCreateForm(true);
  };

  /**
   * Handle create new user
   */
  const handleCreateNew = () => {
    console.log("➕ Creating new user");
    setEditingUser(undefined);
    setShowCreateForm(true);
  };

  /**
   * Handle pagination (like your Pageable parameter)
   */
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  /**
   * Close any error messages
   */
  const handleCloseError = () => {
    clearError();
  };

  return (
    <div
      style={{
        padding: "24px",
        maxWidth: "1400px",
        margin: "0 auto",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      {/* Header Section */}
      <div style={{ marginBottom: "32px" }}>
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "700",
            color: "#212529",
            marginBottom: "8px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          👥 User Management Dashboard
        </h1>
        <p
          style={{
            fontSize: "16px",
            color: "#6c757d",
            marginBottom: 0,
          }}
        >
          Manage your application users - Create, edit, and monitor user
          accounts
        </p>
      </div>

      {/* Error Display (like your @ModelAttribute errors) */}
      {error && (
        <div
          style={{
            backgroundColor: "#f8d7da",
            color: "#721c24",
            padding: "16px",
            borderRadius: "8px",
            marginBottom: "24px",
            border: "1px solid #f1aeb5",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <strong>⚠️ Error:</strong> {error}
          </div>
          <button
            onClick={handleCloseError}
            style={{
              background: "none",
              border: "none",
              fontSize: "18px",
              cursor: "pointer",
              color: "#721c24",
              padding: "4px",
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Controls Section (like your form toolbar) */}
      <div
        style={{
          backgroundColor: "white",
          padding: "24px",
          borderRadius: "8px",
          border: "1px solid #dee2e6",
          marginBottom: "24px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          {/* Search and Stats */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              flex: 1,
            }}
          >
            <div style={{ position: "relative" }}>
              <input
                type="text"
                placeholder="🔍 Search users by name or email..."
                value={searchTerm}
                onChange={handleSearchChange}
                style={{
                  padding: "12px 16px",
                  border: "2px solid #e9ecef",
                  borderRadius: "8px",
                  width: "350px",
                  fontSize: "14px",
                  outline: "none",
                  transition: "border-color 0.2s ease",
                }}
                onFocus={(e) => {
                  (e.target as HTMLElement).style.borderColor = "#007bff";
                }}
                onBlur={(e) => {
                  (e.target as HTMLElement).style.borderColor = "#e9ecef";
                }}
              />
            </div>

            <div
              style={{
                fontSize: "14px",
                color: "#6c757d",
                backgroundColor: "#f8f9fa",
                padding: "8px 12px",
                borderRadius: "6px",
                border: "1px solid #dee2e6",
              }}
            >
              📊 <strong>{pagination.total}</strong> users found
              {searchTerm && <span> (filtered from all users)</span>}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={handleCreateNew}
              style={{
                padding: "12px 24px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.2s ease",
                boxShadow: "0 2px 4px rgba(40, 167, 69, 0.2)",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.backgroundColor = "#218838";
                (e.target as HTMLElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.backgroundColor = "#28a745";
                (e.target as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              ➕ Add New User
            </button>
          </div>
        </div>
      </div>

      {/* User Table */}
      <UserTable
        users={users}
        loading={loading}
        onEdit={handleEditUser}
        onDelete={deleteUser}
      />

      {/* Pagination (like your Spring Data Pageable) */}
      {pagination.totalPages > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "32px",
            gap: "12px",
          }}
        >
          <button
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
            style={{
              padding: "10px 16px",
              border: "2px solid #dee2e6",
              borderRadius: "8px",
              cursor: pagination.page === 1 ? "not-allowed" : "pointer",
              backgroundColor: pagination.page === 1 ? "#f8f9fa" : "white",
              color: pagination.page === 1 ? "#6c757d" : "#495057",
              fontWeight: "500",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              if (pagination.page > 1) {
                (e.target as HTMLElement).style.borderColor = "#007bff";
                (e.target as HTMLElement).style.color = "#007bff";
              }
            }}
            onMouseLeave={(e) => {
              if (pagination.page > 1) {
                (e.target as HTMLElement).style.borderColor = "#dee2e6";
                (e.target as HTMLElement).style.color = "#495057";
              }
            }}
          >
            ← Previous
          </button>

          <div
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              borderRadius: "8px",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            Page {pagination.page} of {pagination.totalPages}
          </div>

          <button
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page === pagination.totalPages}
            style={{
              padding: "10px 16px",
              border: "2px solid #dee2e6",
              borderRadius: "8px",
              cursor:
                pagination.page === pagination.totalPages
                  ? "not-allowed"
                  : "pointer",
              backgroundColor:
                pagination.page === pagination.totalPages ? "#f8f9fa" : "white",
              color:
                pagination.page === pagination.totalPages
                  ? "#6c757d"
                  : "#495057",
              fontWeight: "500",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              if (pagination.page < pagination.totalPages) {
                (e.target as HTMLElement).style.borderColor = "#007bff";
                (e.target as HTMLElement).style.color = "#007bff";
              }
            }}
            onMouseLeave={(e) => {
              if (pagination.page < pagination.totalPages) {
                (e.target as HTMLElement).style.borderColor = "#dee2e6";
                (e.target as HTMLElement).style.color = "#495057";
              }
            }}
          >
            Next →
          </button>
        </div>
      )}

      {/* Stats Footer */}
      <div
        style={{
          marginTop: "32px",
          padding: "20px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          border: "1px solid #dee2e6",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "14px",
            color: "#6c757d",
          }}
        >
          <div>
            Showing {users.length} of {pagination.total} users
            {searchTerm && ` (filtered by "${searchTerm}")`}
          </div>
          <div>
            🚀 <strong>Assignment 1</strong> - User Management Dashboard for
            Backend Developers
          </div>
        </div>
      </div>

      {/* Temporary note - will be replaced with actual form */}
      {showCreateForm && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "32px",
              borderRadius: "12px",
              maxWidth: "500px",
              width: "90%",
              boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
            }}
          >
            <h3 style={{ marginTop: 0, color: "#212529" }}>
              {editingUser ? "✏️ Edit User" : "➕ Create New User"}
            </h3>
            <p style={{ color: "#6c757d", marginBottom: "24px" }}>
              {editingUser
                ? `Editing: ${editingUser.firstName} ${editingUser.lastName}`
                : "Create a new user account"}
            </p>

            <div
              style={{
                backgroundColor: "#fff3cd",
                border: "1px solid #ffeaa7",
                borderRadius: "8px",
                padding: "16px",
                marginBottom: "24px",
              }}
            >
              <strong>🚧 Coming Next:</strong> User form component
              <br />
              <small style={{ color: "#856404" }}>
                This will be your next step - creating the form component with
                validation
              </small>
            </div>

            <button
              onClick={() => setShowCreateForm(false)}
              style={{
                padding: "10px 20px",
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
