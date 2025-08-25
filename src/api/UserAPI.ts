// Mock API layer - Think of this like your Spring Boot @RestController + @Service
// This simulates your typical Spring Boot REST endpoints

import {
    User,
    CreateUserRequest,
    UpdateUserRequest,
    ApiResponse,
    PaginatedResponse,
    ApiError
} from '../types/User';

/**
 * UserAPI - Mock implementation
 * 
 * Think of this like your Spring Boot setup:
 * - UserAPI = @RestController + @Service combined
 * - Each method = @GetMapping, @PostMapping, etc.
 * - Error handling = @ExceptionHandler
 * - Validation = @Valid + BindingResult
 */
export class UserAPI {
    // In-memory data store (like your @Repository layer)
    private static users: User[] = [
        {
            id: 1,
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@company.com",
            role: "admin",
            status: "active",
            createdAt: "2024-01-15T10:30:00Z",
            lastLogin: "2024-01-20T14:15:00Z"
        },
        {
            id: 2,
            firstName: "Jane",
            lastName: "Smith",
            email: "jane.smith@company.com",
            role: "user",
            status: "active",
            createdAt: "2024-01-16T09:20:00Z",
            lastLogin: "2024-01-19T16:45:00Z"
        },
        {
            id: 3,
            firstName: "Bob",
            lastName: "Johnson",
            email: "bob.johnson@company.com",
            role: "moderator",
            status: "inactive",
            createdAt: "2024-01-17T11:10:00Z"
        },
        {
            id: 4,
            firstName: "Alice",
            lastName: "Brown",
            email: "alice.brown@company.com",
            role: "user",
            status: "active",
            createdAt: "2024-01-18T13:25:00Z",
            lastLogin: "2024-01-21T10:30:00Z"
        },
        {
            id: 5,
            firstName: "Charlie",
            lastName: "Wilson",
            email: "charlie.wilson@company.com",
            role: "user",
            status: "suspended",
            createdAt: "2024-01-19T15:40:00Z",
            lastLogin: "2024-01-20T09:15:00Z"
        }
    ];

    /**
     * GET /api/users
     * 
     * Spring Boot equivalent:
     * @GetMapping("/api/users")
     * public ResponseEntity<Page<UserDTO>> getUsers(
     *   @RequestParam(defaultValue = "0") int page,
     *   @RequestParam(defaultValue = "10") int size,
     *   @RequestParam(required = false) String search
     * )
     */
    static async getUsers(
        page = 1,
        pageSize = 10,
        search?: string
    ): Promise<PaginatedResponse<User>> {
        // Simulate network delay (like actual API call)
        await this.delay(500);

        let filteredUsers = this.users;

        // Search functionality (like @Query with LIKE operator)
        if (search && search.trim()) {
            const searchLower = search.toLowerCase();
            filteredUsers = this.users.filter(user =>
                user.firstName.toLowerCase().includes(searchLower) ||
                user.lastName.toLowerCase().includes(searchLower) ||
                user.email.toLowerCase().includes(searchLower)
            );
        }

        // Pagination logic (like Spring Data's Pageable)
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

    /**
     * GET /api/users/{id}
     * 
     * Spring Boot equivalent:
     * @GetMapping("/api/users/{id}")
     * public ResponseEntity<UserDTO> getUserById(@PathVariable Long id)
     */
    static async getUserById(id: number): Promise<ApiResponse<User>> {
        await this.delay(300);

        const user = this.users.find(u => u.id === id);
        if (!user) {
            throw this.createNotFoundError(`User with id ${id} not found`);
        }

        return {
            data: user,
            message: "User retrieved successfully",
            success: true
        };
    }

    /**
     * POST /api/users
     * 
     * Spring Boot equivalent:
     * @PostMapping("/api/users")
     * public ResponseEntity<UserDTO> createUser(@Valid @RequestBody CreateUserRequest request)
     */
    static async createUser(userData: CreateUserRequest): Promise<ApiResponse<User>> {
        await this.delay(800);

        // Validation (like @Valid annotation)
        this.validateCreateUserRequest(userData);

        // Business logic validation (like your service layer)
        if (this.users.some(u => u.email === userData.email)) {
            throw this.createConflictError("Email already exists");
        }

        // Create new user (like your entity creation)
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

    /**
     * PUT /api/users/{id}
     * 
     * Spring Boot equivalent:
     * @PutMapping("/api/users/{id}")
     * public ResponseEntity<UserDTO> updateUser(
     *   @PathVariable Long id, 
     *   @Valid @RequestBody UpdateUserRequest request
     * )
     */
    static async updateUser(id: number, userData: UpdateUserRequest): Promise<ApiResponse<User>> {
        await this.delay(600);

        const userIndex = this.users.findIndex(u => u.id === id);
        if (userIndex === -1) {
            throw this.createNotFoundError(`User with id ${id} not found`);
        }

        // Email uniqueness check (like unique constraint validation)
        if (userData.email && this.users.some(u => u.email === userData.email && u.id !== id)) {
            throw this.createConflictError("Email already exists");
        }

        // Update user (like your entity update)
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

    /**
     * DELETE /api/users/{id}
     * 
     * Spring Boot equivalent:
     * @DeleteMapping("/api/users/{id}")
     * public ResponseEntity<Void> deleteUser(@PathVariable Long id)
     */
    static async deleteUser(id: number): Promise<ApiResponse<null>> {
        await this.delay(400);

        const userIndex = this.users.findIndex(u => u.id === id);
        if (userIndex === -1) {
            throw this.createNotFoundError(`User with id ${id} not found`);
        }

        this.users.splice(userIndex, 1);

        return {
            data: null,
            message: "User deleted successfully",
            success: true
        };
    }

    // Validation methods (like your @Component validators)

    /**
     * Validation logic (like your @Valid annotations + custom validators)
     */
    private static validateCreateUserRequest(userData: CreateUserRequest): void {
        const errors: string[] = [];

        if (!userData.firstName?.trim()) {
            errors.push("First name is required");
        }

        if (!userData.lastName?.trim()) {
            errors.push("Last name is required");
        }

        if (!userData.email?.trim()) {
            errors.push("Email is required");
        } else if (!this.isValidEmail(userData.email)) {
            errors.push("Invalid email format");
        }

        if (!userData.password?.trim()) {
            errors.push("Password is required");
        } else if (userData.password.length < 6) {
            errors.push("Password must be at least 6 characters");
        }

        if (!['admin', 'user', 'moderator'].includes(userData.role)) {
            errors.push("Invalid role");
        }

        if (errors.length > 0) {
            throw this.createValidationError("Validation failed", errors);
        }
    }

    // Utility methods (like your @Component utilities)

    /**
     * Email validation (like your custom validators)
     */
    private static isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Simulate network delay (for realistic API behavior)
     */
    private static delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Error creation methods (like your @ExceptionHandler)

    /**
     * Create validation error (like @ResponseStatus(BAD_REQUEST))
     */
    private static createValidationError(message: string, details: string[]): ApiError {
        const error: ApiError = {
            message,
            code: "VALIDATION_ERROR",
            details: details.map(detail => ({
                field: "",
                message: detail,
                code: "INVALID_VALUE"
            })),
            timestamp: new Date().toISOString()
        };
        throw error;
    }

    /**
     * Create not found error (like @ResponseStatus(NOT_FOUND))
     */
    private static createNotFoundError(message: string): ApiError {
        const error: ApiError = {
            message,
            code: "NOT_FOUND",
            timestamp: new Date().toISOString()
        };
        throw error;
    }

    /**
     * Create conflict error (like @ResponseStatus(CONFLICT))
     */
    private static createConflictError(message: string): ApiError {
        const error: ApiError = {
            message,
            code: "CONFLICT",
            timestamp: new Date().toISOString()
        };
        throw error;
    }
}

/**
 * HTTP Status codes (like Spring Boot's HttpStatus enum)
 */
export const HttpStatus = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500
} as const;
