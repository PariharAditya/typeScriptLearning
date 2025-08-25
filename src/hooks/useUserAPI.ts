// Custom Hook - Think of this like your Spring Boot @Service layer
// This manages state and business logic, just like your UserService class

import { useState, useEffect, useCallback } from 'react';
import { UserAPI } from '../api/UserAPI';
import {
    User,
    CreateUserRequest,
    UpdateUserRequest,
    ApiError
} from '../types/User';

/**
 * Handle API errors (like your @ExceptionHandler)
 * 
 * Spring Boot equivalent:
 * @ExceptionHandler(ApiException.class)
 * public ResponseEntity<ErrorResponse> handleApiException(ApiException ex) {
 *   // error handling logic
 * }
 */
const handleApiError = (err: unknown): string => {
    if (err && typeof err === 'object' && 'message' in err) {
        const apiError = err as ApiError;

        // Handle different error types (like different exception types)
        switch (apiError.code) {
            case 'VALIDATION_ERROR':
                if (apiError.details && apiError.details.length > 0) {
                    return `Validation failed: ${apiError.details.map(d => d.message).join(', ')}`;
                }
                return 'Validation failed';

            case 'NOT_FOUND':
                return 'User not found';

            case 'CONFLICT':
                return apiError.message;

            default:
                return apiError.message || 'An unexpected error occurred';
        }
    }

    return err instanceof Error ? err.message : 'An unexpected error occurred';
};

/**
 * useUserAPI Hook - Your Service Layer in React
 * 
 * Spring Boot equivalent:
 * @Service
 * public class UserService {
 *   private UserRepository userRepository;
 *   // ... service methods
 * }
 * 
 * This hook encapsulates:
 * - State management (like instance variables)
 * - Business logic (like service methods) 
 * - Error handling (like exception handling)
 * - Data fetching (like repository calls)
 */

interface UseUserAPIResult {
    // State (like your service's instance variables)
    users: User[];
    loading: boolean;
    error: string | null;
    pagination: {
        page: number;
        pageSize: number;
        total: number;
        totalPages: number;
    };

    // Actions (like your service methods)
    fetchUsers: (page?: number, search?: string) => Promise<void>;
    createUser: (userData: CreateUserRequest) => Promise<void>;
    updateUser: (id: number, userData: UpdateUserRequest) => Promise<void>;
    deleteUser: (id: number) => Promise<void>;

    // State management actions
    setPage: (page: number) => void;
    setSearch: (search: string) => void;
    clearError: () => void;
}

export const useUserAPI = (): UseUserAPIResult => {
    // State management (like your @Autowired dependencies + instance variables)
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 10,
        total: 0,
        totalPages: 0
    });

    /**
     * Fetch users with pagination and search
     * 
     * Spring Boot equivalent:
     * public Page<UserDTO> findUsers(Pageable pageable, String search) {
     *   // repository logic
     * }
     */
    const fetchUsers = useCallback(async (newPage = page, newSearch = search) => {
        setLoading(true);
        setError(null);

        try {
            console.log(`🔍 Fetching users - Page: ${newPage}, Search: "${newSearch}"`);

            const response = await UserAPI.getUsers(newPage, 10, newSearch);

            setUsers(response.data);
            setPagination({
                page: response.page,
                pageSize: response.pageSize,
                total: response.total,
                totalPages: response.totalPages
            });

            console.log(`✅ Loaded ${response.data.length} users (${response.total} total)`);

        } catch (err) {
            const errorMessage = handleApiError(err);
            setError(errorMessage);
            console.error('❌ Error fetching users:', errorMessage);
        } finally {
            setLoading(false);
        }
    }, [page, search]);

    /**
     * Create new user
     * 
     * Spring Boot equivalent:
     * public UserDTO createUser(CreateUserRequest request) {
     *   // validation and creation logic
     * }
     */
    const createUser = useCallback(async (userData: CreateUserRequest) => {
        setLoading(true);
        setError(null);

        try {
            console.log('🔨 Creating new user:', userData.email);

            await UserAPI.createUser(userData);

            // Refresh the current page after creation (like your @PostPersist callback)
            await fetchUsers();

            console.log('✅ User created successfully');

        } catch (err) {
            const errorMessage = handleApiError(err);
            setError(errorMessage);
            console.error('❌ Error creating user:', errorMessage);
            throw err; // Re-throw for form handling
        } finally {
            setLoading(false);
        }
    }, [fetchUsers]);

    /**
     * Update existing user
     * 
     * Spring Boot equivalent:
     * public UserDTO updateUser(Long id, UpdateUserRequest request) {
     *   // validation and update logic
     * }
     */
    const updateUser = useCallback(async (id: number, userData: UpdateUserRequest) => {
        setLoading(true);
        setError(null);

        try {
            console.log(`🔧 Updating user ${id}:`, userData);

            await UserAPI.updateUser(id, userData);

            // Refresh the current page after update
            await fetchUsers();

            console.log('✅ User updated successfully');

        } catch (err) {
            const errorMessage = handleApiError(err);
            setError(errorMessage);
            console.error('❌ Error updating user:', errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [fetchUsers]);

    /**
     * Delete user
     * 
     * Spring Boot equivalent:
     * public void deleteUser(Long id) {
     *   // deletion logic with cascade handling
     * }
     */
    const deleteUser = useCallback(async (id: number) => {
        setLoading(true);
        setError(null);

        try {
            console.log(`🗑️ Deleting user ${id}`);

            await UserAPI.deleteUser(id);

            // Refresh the current page after deletion
            await fetchUsers();

            console.log('✅ User deleted successfully');

        } catch (err) {
            const errorMessage = handleApiError(err);
            setError(errorMessage);
            console.error('❌ Error deleting user:', errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [fetchUsers]);

    /**
     * Update page number
     * (Triggers automatic data refresh via useEffect)
     */
    const handleSetPage = useCallback((newPage: number) => {
        console.log(`📄 Changing to page ${newPage}`);
        setPage(newPage);
    }, []);

    /**
     * Update search term
     * (Triggers automatic data refresh via useEffect)
     */
    const handleSetSearch = useCallback((newSearch: string) => {
        console.log(`🔍 Searching for: "${newSearch}"`);
        setSearch(newSearch);
        setPage(1); // Reset to first page when searching
    }, []);

    /**
     * Clear error state
     */
    const clearError = useCallback(() => {
        setError(null);
    }, []);

    /**
     * Auto-fetch data when page or search changes
     * 
     * Think of this like Spring Boot's @EventListener
     * It automatically triggers data refresh when dependencies change
     */
    useEffect(() => {
        fetchUsers(page, search);
    }, [page, search, fetchUsers]);

    // Return the "public interface" of this service
    return {
        // State
        users,
        loading,
        error,
        pagination,

        // Actions
        fetchUsers,
        createUser,
        updateUser,
        deleteUser,

        // State management
        setPage: handleSetPage,
        setSearch: handleSetSearch,
        clearError
    };
};

/**
 * Hook for managing individual user operations
 * 
 * Spring Boot equivalent:
 * @Service
 * public class UserDetailService {
 *   // Single user operations
 * }
 */
export const useUserDetail = (userId?: number) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchUser = useCallback(async (id: number) => {
        setLoading(true);
        setError(null);

        try {
            const response = await UserAPI.getUserById(id);
            setUser(response.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch user');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (userId) {
            fetchUser(userId);
        }
    }, [userId, fetchUser]);

    return {
        user,
        loading,
        error,
        refetch: () => userId && fetchUser(userId)
    };
};
