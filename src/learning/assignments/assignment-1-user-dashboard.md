# 🎯 Assignment 1: User Management Dashboard

**For Backend Developers** | **Time**: 2-3 hours | **Industry Relevance**: 95%

---

## **🎯 Mission: Build a Real Admin Dashboard**

You'll build a user management system that every backend developer needs to create at some point. Think of this as the **frontend counterpart** to your user management APIs.

### **What You're Building**

A complete admin dashboard that handles:

- ✅ **User CRUD operations** (like your REST endpoints)
- ✅ **Real-time data fetching** (API integration)
- ✅ **Form validation** (data integrity)
- ✅ **Error handling** (production reliability)

---

## **📋 Requirements (Backend Dev Focused)**

### **1. Data Models (Think DTOs)**

```tsx
// User entity (like your backend model)
interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: "admin" | "user" | "moderator";
  status: "active" | "inactive" | "suspended";
  createdAt: string;
  lastLogin?: string;
}

// Create user request (like your request DTO)
interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  role: "admin" | "user" | "moderator";
  password: string;
}

// Update user request (like your update DTO)
interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: "admin" | "user" | "moderator";
  status?: "active" | "inactive" | "suspended";
}

// API response wrapper (like your response entities)
interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
```

### **2. API Layer (Think Service Layer)**

```tsx
// Mock API (simulate your backend endpoints)
class UserAPI {
  private static users: User[] = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john@company.com",
      role: "admin",
      status: "active",
      createdAt: "2024-01-15T10:30:00Z",
      lastLogin: "2024-01-20T14:15:00Z"
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@company.com",
      role: "user",
      status: "active",
      createdAt: "2024-01-16T09:20:00Z",
      lastLogin: "2024-01-19T16:45:00Z"
    },
    {
      id: 3,
      firstName: "Bob",
      lastName: "Johnson",
      email: "bob@company.com",
      role: "moderator",
      status: "inactive",
      createdAt: "2024-01-17T11:10:00Z"
    }
  ];

  // GET /api/users
  static async getUsers(page = 1, pageSize = 10, search?: string): Promise<PaginatedResponse<User>> {
    // Simulate API delay
    await this.delay(500);

    let filteredUsers = this.users;

    if (search) {
      filteredUsers = this.users.filter(user =>
        user.firstName.toLowerCase().includes(search.toLowerCase()) ||
        user.lastName.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    const total = filteredUsers.length;
    const totalPages = Math.ceil(total / pageSize);
    const startIndex = (page - 1) * pageSize;
    const data = filteredUsers.slice(startIndex, startIndex + pageSize);

    return {
      data,
      total,
      page,
      pageSize,
      totalPages
    };
  }

  // GET /api/users/:id
  static async getUserById(id: number): Promise<ApiResponse<User>> {
    await this.delay(300);

    const user = this.users.find(u => u.id === id);
    if (!user) {
      throw new Error(\`User with id \${id} not found\`);
    }

    return {
      data: user,
      message: "User retrieved successfully",
      success: true
    };
  }

  // POST /api/users
  static async createUser(userData: CreateUserRequest): Promise<ApiResponse<User>> {
    await this.delay(800);

    // Simulate validation
    if (this.users.some(u => u.email === userData.email)) {
      throw new Error("Email already exists");
    }

    const newUser: User = {
      id: Math.max(...this.users.map(u => u.id)) + 1,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      role: userData.role,
      status: 'active',
      createdAt: new Date().toISOString(),
    };

    this.users.push(newUser);

    return {
      data: newUser,
      message: "User created successfully",
      success: true
    };
  }

  // PUT /api/users/:id
  static async updateUser(id: number, userData: UpdateUserRequest): Promise<ApiResponse<User>> {
    await this.delay(600);

    const userIndex = this.users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      throw new Error(\`User with id \${id} not found\`);
    }

    // Check email uniqueness if email is being updated
    if (userData.email && this.users.some(u => u.email === userData.email && u.id !== id)) {
      throw new Error("Email already exists");
    }

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...userData
    };

    return {
      data: this.users[userIndex],
      message: "User updated successfully",
      success: true
    };
  }

  // DELETE /api/users/:id
  static async deleteUser(id: number): Promise<ApiResponse<null>> {
    await this.delay(400);

    const userIndex = this.users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      throw new Error(\`User with id \${id} not found\`);
    }

    this.users.splice(userIndex, 1);

    return {
      data: null,
      message: "User deleted successfully",
      success: true
    };
  }

  // Utility method to simulate network delay
  private static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

---

## **🛠️ Implementation Steps**

### **Step 1: Create the API Hook (Custom Hook)**

Think of this like a **service class** in your backend:

```tsx
// src/hooks/useUserAPI.ts
import { useState, useEffect } from "react";

interface UseUserAPIResult {
  users: User[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };

  // Actions (like service methods)
  fetchUsers: (page?: number, search?: string) => Promise<void>;
  createUser: (userData: CreateUserRequest) => Promise<void>;
  updateUser: (id: number, userData: UpdateUserRequest) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;

  // State management
  setPage: (page: number) => void;
  setSearch: (search: string) => void;
}

export const useUserAPI = (): UseUserAPIResult => {
  // State (like instance variables)
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0,
  });

  // Fetch users (like a service method)
  const fetchUsers = async (newPage = page, newSearch = search) => {
    setLoading(true);
    setError(null);

    try {
      const response = await UserAPI.getUsers(newPage, 10, newSearch);
      setUsers(response.data);
      setPagination({
        page: response.page,
        pageSize: response.pageSize,
        total: response.total,
        totalPages: response.totalPages,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  // Create user
  const createUser = async (userData: CreateUserRequest) => {
    setLoading(true);
    setError(null);

    try {
      await UserAPI.createUser(userData);
      await fetchUsers(); // Refresh list
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create user");
      throw err; // Re-throw for form handling
    } finally {
      setLoading(false);
    }
  };

  // Update user
  const updateUser = async (id: number, userData: UpdateUserRequest) => {
    setLoading(true);
    setError(null);

    try {
      await UserAPI.updateUser(id, userData);
      await fetchUsers(); // Refresh list
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update user");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete user
  const deleteUser = async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      await UserAPI.deleteUser(id);
      await fetchUsers(); // Refresh list
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete user");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Auto-fetch on page or search change
  useEffect(() => {
    fetchUsers(page, search);
  }, [page, search]);

  return {
    users,
    loading,
    error,
    pagination,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    setPage,
    setSearch,
  };
};
```

### **Step 2: Create the User Table Component**

Think of this like a **data grid** or **table view**:

```tsx
// src/components/UserTable.tsx
import React from 'react';

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
  onDelete
}) => {
  if (loading) {
    return <div>Loading users...</div>;
  }

  if (users.length === 0) {
    return <div>No users found</div>;
  }

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ backgroundColor: '#f5f5f5' }}>
          <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>ID</th>
          <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Name</th>
          <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Email</th>
          <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Role</th>
          <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Status</th>
          <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Created</th>
          <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td style={{ padding: '12px', border: '1px solid #ddd' }}>{user.id}</td>
            <td style={{ padding: '12px', border: '1px solid #ddd' }}>
              {user.firstName} {user.lastName}
            </td>
            <td style={{ padding: '12px', border: '1px solid #ddd' }}>{user.email}</td>
            <td style={{ padding: '12px', border: '1px solid #ddd' }}>
              <span style={{
                padding: '4px 8px',
                borderRadius: '4px',
                backgroundColor: user.role === 'admin' ? '#e3f2fd' : user.role === 'moderator' ? '#fff3e0' : '#f3e5f5',
                color: user.role === 'admin' ? '#1976d2' : user.role === 'moderator' ? '#f57c00' : '#7b1fa2'
              }}>
                {user.role}
              </span>
            </td>
            <td style={{ padding: '12px', border: '1px solid #ddd' }}>
              <span style={{
                padding: '4px 8px',
                borderRadius: '4px',
                backgroundColor: user.status === 'active' ? '#e8f5e8' : user.status === 'inactive' ? '#fff3cd' : '#f8d7da',
                color: user.status === 'active' ? '#2e7d32' : user.status === 'inactive' ? '#856404' : '#721c24'
              }}>
                {user.status}
              </span>
            </td>
            <td style={{ padding: '12px', border: '1px solid #ddd' }}>
              {new Date(user.createdAt).toLocaleDateString()}
            </td>
            <td style={{ padding: '12px', border: '1px solid #ddd' }}>
              <button
                onClick={() => onEdit(user)}
                style={{
                  marginRight: '8px',
                  padding: '4px 8px',
                  backgroundColor: '#2196f3',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  if (window.confirm(\`Are you sure you want to delete \${user.firstName} \${user.lastName}?\`)) {
                    onDelete(user.id);
                  }
                }}
                style={{
                  padding: '4px 8px',
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
```

### **Step 3: Create the User Form Component**

Think of this like a **form validation layer**:

```tsx
// src/components/UserForm.tsx
import React, { useState, useEffect } from 'react';

interface UserFormProps {
  user?: User; // For editing
  onSubmit: (userData: CreateUserRequest | UpdateUserRequest) => Promise<void>;
  onCancel: () => void;
}

export const UserForm: React.FC<UserFormProps> = ({ user, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    role: user?.role || 'user' as const,
    status: user?.status || 'active' as const,
    password: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  // Validation (like your backend validation)
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Password required only for new users
    if (!user && !formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (!user && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      if (user) {
        // Update user (exclude password if not provided)
        const updateData: UpdateUserRequest = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          role: formData.role,
          status: formData.status
        };
        await onSubmit(updateData);
      } else {
        // Create user
        const createData: CreateUserRequest = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          role: formData.role,
          password: formData.password
        };
        await onSubmit(createData);
      }
    } catch (error) {
      // Error is handled by parent component
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '24px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      marginBottom: '24px'
    }}>
      <h3>{user ? 'Edit User' : 'Create New User'}</h3>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
            First Name *
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              border: \`1px solid \${errors.firstName ? '#f44336' : '#ddd'}\`,
              borderRadius: '4px'
            }}
          />
          {errors.firstName && <span style={{ color: '#f44336', fontSize: '14px' }}>{errors.firstName}</span>}
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
            Last Name *
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              border: \`1px solid \${errors.lastName ? '#f44336' : '#ddd'}\`,
              borderRadius: '4px'
            }}
          />
          {errors.lastName && <span style={{ color: '#f44336', fontSize: '14px' }}>{errors.lastName}</span>}
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
            Email *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              border: \`1px solid \${errors.email ? '#f44336' : '#ddd'}\`,
              borderRadius: '4px'
            }}
          />
          {errors.email && <span style={{ color: '#f44336', fontSize: '14px' }}>{errors.email}</span>}
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
            Role
          </label>
          <select
            value={formData.role}
            onChange={(e) => handleChange('role', e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          >
            <option value="user">User</option>
            <option value="moderator">Moderator</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {user && (
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        )}

        {!user && (
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
              Password *
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                border: \`1px solid \${errors.password ? '#f44336' : '#ddd'}\`,
                borderRadius: '4px'
              }}
            />
            {errors.password && <span style={{ color: '#f44336', fontSize: '14px' }}>{errors.password}</span>}
          </div>
        )}

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            type="submit"
            disabled={submitting}
            style={{
              padding: '12px 24px',
              backgroundColor: submitting ? '#ccc' : '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: submitting ? 'not-allowed' : 'pointer'
            }}
          >
            {submitting ? 'Saving...' : (user ? 'Update User' : 'Create User')}
          </button>

          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: '12px 24px',
              backgroundColor: '#f5f5f5',
              color: '#333',
              border: '1px solid #ddd',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
```

### **Step 4: Create the Main Dashboard Component**

Think of this like your **main controller** that orchestrates everything:

```tsx
// src/components/UserDashboard.tsx
import React, { useState } from "react";
import { useUserAPI } from "../hooks/useUserAPI";
import { UserTable } from "./UserTable";
import { UserForm } from "./UserForm";

export const UserDashboard: React.FC = () => {
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
  } = useUserAPI();

  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>();
  const [searchTerm, setSearchTerm] = useState("");

  // Handle form submission
  const handleFormSubmit = async (
    userData: CreateUserRequest | UpdateUserRequest
  ) => {
    try {
      if (editingUser) {
        await updateUser(editingUser.id, userData as UpdateUserRequest);
      } else {
        await createUser(userData as CreateUserRequest);
      }

      // Close form on success
      setShowForm(false);
      setEditingUser(undefined);
    } catch (error) {
      // Error is handled by the hook and displayed in the UI
    }
  };

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Debounce search (simple implementation)
    setTimeout(() => {
      setSearch(value);
      setPage(1); // Reset to first page
    }, 300);
  };

  // Handle edit
  const handleEdit = (user: User) => {
    setEditingUser(user);
    setShowForm(true);
  };

  // Handle create new
  const handleCreateNew = () => {
    setEditingUser(undefined);
    setShowForm(true);
  };

  // Handle form cancel
  const handleFormCancel = () => {
    setShowForm(false);
    setEditingUser(undefined);
  };

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>User Management Dashboard</h1>

      {/* Error Display */}
      {error && (
        <div
          style={{
            backgroundColor: "#ffebee",
            color: "#c62828",
            padding: "12px",
            borderRadius: "4px",
            marginBottom: "16px",
            border: "1px solid #ef9a9a",
          }}
        >
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
          gap: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={handleSearch}
            style={{
              padding: "8px 12px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              width: "300px",
            }}
          />

          <span style={{ color: "#666" }}>{pagination.total} users found</span>
        </div>

        <button
          onClick={handleCreateNew}
          style={{
            padding: "12px 24px",
            backgroundColor: "#2196f3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          + Add New User
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <UserForm
          user={editingUser}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      )}

      {/* User Table */}
      <UserTable
        users={users}
        loading={loading}
        onEdit={handleEdit}
        onDelete={deleteUser}
      />

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "24px",
            gap: "8px",
          }}
        >
          <button
            onClick={() => setPage(pagination.page - 1)}
            disabled={pagination.page === 1}
            style={{
              padding: "8px 12px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              cursor: pagination.page === 1 ? "not-allowed" : "pointer",
              backgroundColor: pagination.page === 1 ? "#f5f5f5" : "white",
            }}
          >
            Previous
          </button>

          <span style={{ padding: "8px 16px" }}>
            Page {pagination.page} of {pagination.totalPages}
          </span>

          <button
            onClick={() => setPage(pagination.page + 1)}
            disabled={pagination.page === pagination.totalPages}
            style={{
              padding: "8px 12px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              cursor:
                pagination.page === pagination.totalPages
                  ? "not-allowed"
                  : "pointer",
              backgroundColor:
                pagination.page === pagination.totalPages ? "#f5f5f5" : "white",
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
```

---

## **🎯 Your Task**

### **Step 1: Create the Files**

Create these files in your project:

1. `src/types/User.ts` - All the TypeScript interfaces
2. `src/api/UserAPI.ts` - The mock API class
3. `src/hooks/useUserAPI.ts` - The custom hook
4. `src/components/UserTable.tsx` - The table component
5. `src/components/UserForm.tsx` - The form component
6. `src/components/UserDashboard.tsx` - The main dashboard

### **Step 2: Update App.tsx**

Replace your App.tsx content with:

```tsx
import React from "react";
import { UserDashboard } from "./components/UserDashboard";

function App() {
  return (
    <div className="App">
      <UserDashboard />
    </div>
  );
}

export default App;
```

### **Step 3: Test All Features**

Test these operations (like testing your REST endpoints):

- ✅ **List users** with pagination
- ✅ **Search users** by name/email
- ✅ **Create new user** with validation
- ✅ **Edit existing user**
- ✅ **Delete user** with confirmation
- ✅ **Handle errors** gracefully

### **Step 4: Observe the Patterns**

Notice how this mirrors backend development:

- **API layer** = Your service layer
- **Custom hook** = Your business logic layer
- **Components** = Your controllers/views
- **TypeScript interfaces** = Your DTOs/entities
- **Error handling** = Your exception handling

---

## **🎯 Success Criteria**

You've successfully completed this assignment when:

✅ **All CRUD operations work** (Create, Read, Update, Delete)  
✅ **Search functionality** filters users in real-time  
✅ **Form validation** prevents invalid data  
✅ **Error handling** shows meaningful messages  
✅ **Loading states** indicate when operations are in progress  
✅ **Pagination** handles large datasets  
✅ **TypeScript** provides type safety throughout

---

## **🚀 Next Steps**

Once you complete this assignment:

1. **Connect to real API** - Replace the mock API with actual HTTP calls
2. **Add authentication** - Implement login/logout functionality
3. **Add more features** - Bulk operations, export to CSV, etc.
4. **Optimize performance** - Add memoization and virtual scrolling

**This single assignment covers 80% of what you'll do in real React projects!**

Ready to start? Let me know which file you'd like me to create first! 🎯
