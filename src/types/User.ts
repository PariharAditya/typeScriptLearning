// TypeScript interfaces for User Management System
// Think of these as your backend DTOs/Entities

// User entity (like your database model)
export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: 'admin' | 'user' | 'moderator';
    status: 'active' | 'inactive' | 'suspended';
    createdAt: string;
    lastLogin?: string;
}

// Create user request (like your request DTO)
export interface CreateUserRequest {
    firstName: string;
    lastName: string;
    email: string;
    role: 'admin' | 'user' | 'moderator';
    password: string;
}

// Update user request (like your update DTO)
export interface UpdateUserRequest {
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: 'admin' | 'user' | 'moderator';
    status?: 'active' | 'inactive' | 'suspended';
}

// API response wrapper (like your response entities)
export interface ApiResponse<T> {
    data: T;
    message: string;
    success: boolean;
}

// Paginated response (for large datasets)
export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

// Validation error (like your validation exceptions)
export interface ValidationError {
    field: string;
    message: string;
    code: string;
}

// API error (like your error responses)
export interface ApiError {
    message: string;
    code: string;
    details?: ValidationError[];
    timestamp: string;
}
