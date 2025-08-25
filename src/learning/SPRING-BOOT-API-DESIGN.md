# 🔧 Spring Boot API Design for Next.js Frontend

**Complete Backend Architecture Guide**

---

## **🎯 Your API Architecture**

```
┌─────────────────┐    HTTP/REST     ┌─────────────────┐    JPA     ┌──────────────┐
│   Next.js       │ ──────────────→  │  Spring Boot    │ ────────→  │ PostgreSQL   │
│                 │                  │                 │            │              │
│ - User Interface│                  │ - REST APIs     │            │ - User Data  │
│ - API Calls     │                  │ - Business Logic│            │ - Audit Logs │
│ - State Mgmt    │                  │ - Validation    │            │ - Sessions   │
│ - Form Handling │                  │ - Security      │            │              │
└─────────────────┘                  └─────────────────┘            └──────────────┘
```

---

## **📋 API Endpoints Design**

### **User Management API**

```java
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = {"http://localhost:3000", "https://yourapp.vercel.app"})
@Validated
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * GET /api/users
     * Matches your React/Next.js useUserAPI.fetchUsers()
     */
    @GetMapping
    public ResponseEntity<PagedResponse<UserDTO>> getUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String role,
            @RequestParam(required = false) String status
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<UserDTO> users = userService.findUsers(pageable, search, role, status);

        PagedResponse<UserDTO> response = PagedResponse.<UserDTO>builder()
            .data(users.getContent())
            .page(users.getNumber() + 1) // Frontend expects 1-based
            .pageSize(users.getSize())
            .total(users.getTotalElements())
            .totalPages(users.getTotalPages())
            .build();

        return ResponseEntity.ok(response);
    }

    /**
     * GET /api/users/{id}
     * For user detail pages
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserDTO>> getUser(@PathVariable Long id) {
        UserDTO user = userService.findById(id);

        ApiResponse<UserDTO> response = ApiResponse.<UserDTO>builder()
            .data(user)
            .message("User retrieved successfully")
            .success(true)
            .build();

        return ResponseEntity.ok(response);
    }

    /**
     * POST /api/users
     * Matches your React/Next.js useUserAPI.createUser()
     */
    @PostMapping
    public ResponseEntity<ApiResponse<UserDTO>> createUser(
            @Valid @RequestBody CreateUserRequest request
    ) {
        UserDTO user = userService.createUser(request);

        ApiResponse<UserDTO> response = ApiResponse.<UserDTO>builder()
            .data(user)
            .message("User created successfully")
            .success(true)
            .build();

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * PUT /api/users/{id}
     * Matches your React/Next.js useUserAPI.updateUser()
     */
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<UserDTO>> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UpdateUserRequest request
    ) {
        UserDTO user = userService.updateUser(id, request);

        ApiResponse<UserDTO> response = ApiResponse.<UserDTO>builder()
            .data(user)
            .message("User updated successfully")
            .success(true)
            .build();

        return ResponseEntity.ok(response);
    }

    /**
     * DELETE /api/users/{id}
     * Matches your React/Next.js useUserAPI.deleteUser()
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);

        ApiResponse<Void> response = ApiResponse.<Void>builder()
            .data(null)
            .message("User deleted successfully")
            .success(true)
            .build();

        return ResponseEntity.ok(response);
    }
}
```

---

## **🏗️ Data Models (Match Your TypeScript)**

### **JPA Entities**

```java
@Entity
@Table(name = "users")
@EntityListeners(AuditingEntityListener.class)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(unique = true, nullable = false)
    private String email;

    @Enumerated(EnumType.STRING)
    private UserRole role;

    @Enumerated(EnumType.STRING)
    private UserStatus status;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "last_login")
    private LocalDateTime lastLogin;

    @Column(nullable = false)
    private String password; // Encrypted

    // Constructors, getters, setters
}

public enum UserRole {
    ADMIN, USER, MODERATOR
}

public enum UserStatus {
    ACTIVE, INACTIVE, SUSPENDED
}
```

### **DTOs (Match Your TypeScript Interfaces)**

```java
// Matches your TypeScript User interface
@Data
@Builder
public class UserDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private UserRole role;
    private UserStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime lastLogin;
}

// Matches your TypeScript CreateUserRequest interface
@Data
@Valid
public class CreateUserRequest {

    @NotBlank(message = "First name is required")
    @Size(min = 2, max = 50, message = "First name must be between 2 and 50 characters")
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Size(min = 2, max = 50, message = "Last name must be between 2 and 50 characters")
    private String lastName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotNull(message = "Role is required")
    private UserRole role;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;
}

// Matches your TypeScript UpdateUserRequest interface
@Data
public class UpdateUserRequest {

    @Size(min = 2, max = 50, message = "First name must be between 2 and 50 characters")
    private String firstName;

    @Size(min = 2, max = 50, message = "Last name must be between 2 and 50 characters")
    private String lastName;

    @Email(message = "Invalid email format")
    private String email;

    private UserRole role;
    private UserStatus status;
}

// Matches your TypeScript PagedResponse interface
@Data
@Builder
public class PagedResponse<T> {
    private List<T> data;
    private long total;
    private int page;
    private int pageSize;
    private int totalPages;
}

// Matches your TypeScript ApiResponse interface
@Data
@Builder
public class ApiResponse<T> {
    private T data;
    private String message;
    private boolean success;
}
```

---

## **🔧 Service Layer**

```java
@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserMapper userMapper;

    /**
     * Find users with pagination and search
     * Supports your frontend's search and pagination needs
     */
    public Page<UserDTO> findUsers(Pageable pageable, String search, String role, String status) {
        Specification<User> spec = UserSpecifications.withFilters(search, role, status);
        Page<User> users = userRepository.findAll(spec, pageable);
        return users.map(userMapper::toDTO);
    }

    /**
     * Find user by ID
     */
    public UserDTO findById(Long id) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
        return userMapper.toDTO(user);
    }

    /**
     * Create new user
     */
    public UserDTO createUser(CreateUserRequest request) {
        // Validate email uniqueness
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new EmailAlreadyExistsException("Email already exists: " + request.getEmail());
        }

        User user = User.builder()
            .firstName(request.getFirstName())
            .lastName(request.getLastName())
            .email(request.getEmail())
            .role(request.getRole())
            .status(UserStatus.ACTIVE)
            .password(passwordEncoder.encode(request.getPassword()))
            .build();

        User savedUser = userRepository.save(user);
        return userMapper.toDTO(savedUser);
    }

    /**
     * Update user
     */
    public UserDTO updateUser(Long id, UpdateUserRequest request) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));

        // Check email uniqueness if email is being updated
        if (request.getEmail() != null && !request.getEmail().equals(user.getEmail())) {
            if (userRepository.existsByEmail(request.getEmail())) {
                throw new EmailAlreadyExistsException("Email already exists: " + request.getEmail());
            }
        }

        // Update fields
        if (request.getFirstName() != null) user.setFirstName(request.getFirstName());
        if (request.getLastName() != null) user.setLastName(request.getLastName());
        if (request.getEmail() != null) user.setEmail(request.getEmail());
        if (request.getRole() != null) user.setRole(request.getRole());
        if (request.getStatus() != null) user.setStatus(request.getStatus());

        User updatedUser = userRepository.save(user);
        return userMapper.toDTO(updatedUser);
    }

    /**
     * Delete user
     */
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }
}
```

---

## **🔍 Repository Layer**

```java
@Repository
public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {

    boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.status = :status")
    Page<User> findByStatus(@Param("status") UserStatus status, Pageable pageable);

    @Query("SELECT u FROM User u WHERE u.role = :role")
    Page<User> findByRole(@Param("role") UserRole role, Pageable pageable);
}

// For complex search functionality
public class UserSpecifications {

    public static Specification<User> withFilters(String search, String role, String status) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (search != null && !search.isEmpty()) {
                String searchPattern = "%" + search.toLowerCase() + "%";
                Predicate firstNamePredicate = criteriaBuilder.like(
                    criteriaBuilder.lower(root.get("firstName")), searchPattern);
                Predicate lastNamePredicate = criteriaBuilder.like(
                    criteriaBuilder.lower(root.get("lastName")), searchPattern);
                Predicate emailPredicate = criteriaBuilder.like(
                    criteriaBuilder.lower(root.get("email")), searchPattern);

                predicates.add(criteriaBuilder.or(firstNamePredicate, lastNamePredicate, emailPredicate));
            }

            if (role != null && !role.isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("role"), UserRole.valueOf(role.toUpperCase())));
            }

            if (status != null && !status.isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("status"), UserStatus.valueOf(status.toUpperCase())));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
```

---

## **⚠️ Exception Handling**

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleUserNotFound(UserNotFoundException ex) {
        ErrorResponse error = ErrorResponse.builder()
            .message(ex.getMessage())
            .code("USER_NOT_FOUND")
            .timestamp(LocalDateTime.now())
            .build();
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(EmailAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> handleEmailAlreadyExists(EmailAlreadyExistsException ex) {
        ErrorResponse error = ErrorResponse.builder()
            .message(ex.getMessage())
            .code("EMAIL_ALREADY_EXISTS")
            .timestamp(LocalDateTime.now())
            .build();
        return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationErrors(MethodArgumentNotValidException ex) {
        List<ValidationError> validationErrors = ex.getBindingResult()
            .getFieldErrors()
            .stream()
            .map(error -> ValidationError.builder()
                .field(error.getField())
                .message(error.getDefaultMessage())
                .code("VALIDATION_ERROR")
                .build())
            .collect(Collectors.toList());

        ErrorResponse error = ErrorResponse.builder()
            .message("Validation failed")
            .code("VALIDATION_ERROR")
            .details(validationErrors)
            .timestamp(LocalDateTime.now())
            .build();

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }
}

@Data
@Builder
public class ErrorResponse {
    private String message;
    private String code;
    private List<ValidationError> details;
    private LocalDateTime timestamp;
}

@Data
@Builder
public class ValidationError {
    private String field;
    private String message;
    private String code;
}
```

---

## **🔐 Security Configuration**

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/users").hasAnyRole("USER", "ADMIN")
                .requestMatchers(HttpMethod.POST, "/api/users").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/users/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/users/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()));

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(Arrays.asList(
            "http://localhost:3000",      // Next.js dev
            "https://*.vercel.app"        // Next.js production
        ));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", configuration);
        return source;
    }
}
```

---

## **📝 Application Configuration**

```yaml
# application.yml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/user_management
    username: ${DB_USERNAME:admin}
    password: ${DB_PASSWORD:password}
    driver-class-name: org.postgresql.Driver

  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: ${SHOW_SQL:false}
    properties:
      hibernate:
        format_sql: true
        dialect: org.hibernate.dialect.PostgreSQLDialect

  flyway:
    enabled: true
    locations: classpath:db/migration

  security:
    oauth2:
      resourceserver:
        jwt:
          issuer-uri: ${JWT_ISSUER_URI:http://localhost:8080/auth/realms/user-management}

server:
  port: 8080

logging:
  level:
    com.yourcompany.usermanagement: ${LOG_LEVEL:INFO}
    org.springframework.security: DEBUG

management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics
  endpoint:
    health:
      show-details: always
```

---

## **🚀 Integration Testing**

```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Testcontainers
class UserControllerIntegrationTest {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15")
            .withDatabaseName("testdb")
            .withUsername("test")
            .withPassword("test");

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private UserRepository userRepository;

    @Test
    void shouldGetUsersWithPagination() {
        // Test that matches your frontend pagination
        ResponseEntity<PagedResponse> response = restTemplate.getForEntity(
            "/api/users?page=0&size=10", PagedResponse.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody().getData()).isNotNull();
    }

    @Test
    void shouldCreateUserSuccessfully() {
        // Test that matches your frontend form submission
        CreateUserRequest request = CreateUserRequest.builder()
            .firstName("John")
            .lastName("Doe")
            .email("john.doe@example.com")
            .role(UserRole.USER)
            .password("password123")
            .build();

        ResponseEntity<ApiResponse> response = restTemplate.postForEntity(
            "/api/users", request, ApiResponse.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(response.getBody().isSuccess()).isTrue();
    }
}
```

---

## **🎯 Next Steps**

### **1. Set Up Spring Boot Project**

```bash
# Use Spring Initializr or CLI
spring init --dependencies=web,data-jpa,postgresql,security,validation user-management-api
cd user-management-api
```

### **2. Implement Core Features**

- [ ] User CRUD operations
- [ ] Pagination and search
- [ ] Validation and error handling
- [ ] Security configuration

### **3. Test API Endpoints**

```bash
# Test with curl or Postman
curl -X GET "http://localhost:8080/api/users?page=0&size=10"
curl -X POST "http://localhost:8080/api/users" -H "Content-Type: application/json" -d '{"firstName":"John","lastName":"Doe","email":"john@example.com","role":"USER","password":"password123"}'
```

### **4. Connect to Next.js**

- Update your Next.js API routes to call Spring Boot
- Handle authentication tokens
- Error handling and user feedback

**This API design perfectly matches your React/Next.js frontend patterns!** 🎯
