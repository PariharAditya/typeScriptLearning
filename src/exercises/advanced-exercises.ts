// Advanced TypeScript Exercises
// Complete these exercises to master advanced TypeScript concepts!

console.log("🚀 Advanced TypeScript Exercises");

// Exercise 1: Union Types and Type Guards
console.log("\n1. Union Types and Type Guards");
// TODO: Create a union type for different payment methods: "credit_card", "paypal", "bank_transfer", "cash"
type PaymentMethod = "credit_card" | "paypal" | "bank_transfer" | "cash";

function processPayment(method: PaymentMethod, amount: number): string {
    switch (method) {
        case "credit_card":
            return `Processing credit card payment of $${amount}`;
        case "paypal":
            return `Processing PayPal payment of $${amount}`;
        case "bank_transfer":
            return `Processing bank transfer payment of $${amount}`;    
        case "cash":
            return `Processing cash payment of $${amount}`;
        default:
            // Exhaustive check
            const _exhaustiveCheck: never = method;
            return _exhaustiveCheck;
    }
}
// TODO: Test your function
console.log(processPayment("credit_card", 100));
console.log(processPayment("paypal", 250));

// Exercise 2: Intersection Types
console.log("\n2. Intersection Types");
// TODO: Create interfaces for different user capabilities
interface CanRead {
    read(item: string): void;
}

interface CanWrite {
    write(item: string): void;
}

interface CanDelete {
    delete(item: string): void;
}

// TODO: Create intersection types for different user roles
type Viewer = CanRead
type Editor = CanRead & CanWrite;
type Admin =  CanRead & CanWrite & CanDelete;

// TODO: Implement a user class that can be assigned different roles
class SystemUser implements Admin {
    name: string;
    
    constructor(name: string) {
        this.name = name;
    }
    
    // Implement the required methods
    read(item: string): void {
        console.log(`${this.name} is reading ${item}`);
    }
    
    write(item: string): void {
        console.log(`${this.name} is writing ${item}`);
    }
    
    delete(item: string): void {
        console.log(`${this.name} is deleting ${item}`);
    }
}

// TODO: Create and test your user
const systemAdmin = new SystemUser("Alice");
systemAdmin.read("document");
systemAdmin.write("report");
systemAdmin.delete("old_file");

// Exercise 3: Custom Type Guards
console.log("\n3. Custom Type Guards");
// TODO: Create interfaces for different shapes with discriminated unions
interface CircleShape {
    kind: "circle";
    radius: number;
}

interface RectangleShape {
    kind: "rectangle";
    width: number;
    height: number;
}

interface TriangleShape {
    kind: "triangle";
    base: number;
    height: number;
}

type GeometricShape = CircleShape | RectangleShape | TriangleShape;

// TODO: Create type guard functions
function isCircleShape(shape: GeometricShape): shape is CircleShape {
    return shape.kind === "circle";
}

function isRectangleShape(shape: GeometricShape): shape is RectangleShape {
    return shape.kind === "rectangle";  
}

function isTriangleShape(shape: GeometricShape): shape is TriangleShape {
    return shape.kind === "triangle";
}

// TODO: Create a function to calculate area using type guards
function calculateShapeArea(shape: GeometricShape): number {
    if (isCircleShape(shape)) {
        return Math.PI * shape.radius * shape.radius;
    } else if (isRectangleShape(shape)) {
        return shape.width * shape.height;
    } else if (isTriangleShape(shape)) {
        return (shape.base * shape.height) / 2;
    }
    // Exhaustive check
    const _exhaustiveCheck: never = shape;
    return _exhaustiveCheck;
}

// TODO: Test your functions
const circleShape: CircleShape = { kind: "circle", radius: 5 };
const rectangleShape: RectangleShape = { kind: "rectangle", width: 10, height: 6 };
const triangleShape: TriangleShape = { kind: "triangle", base: 8, height: 4 };

console.log(`Circle area: ${calculateShapeArea(circleShape)}`);
console.log(`Rectangle area: ${calculateShapeArea(rectangleShape)}`);
console.log(`Triangle area: ${calculateShapeArea(triangleShape)}`);

// Exercise 4: Discriminated Unions for API States
console.log("\n4. Discriminated Unions for API States");
// TODO: Create discriminated union for different API response states
interface LoadingResponse {
    status: "loading";
    message: string;
}

interface SuccessResponse<T> {
    status: "success";
    data: T;
    timestamp: Date;
}

interface ErrorResponse {
    status: "error";
    error: string;
    errorCode: number;
}

type ApiResponse<T> = LoadingResponse | SuccessResponse<T> | ErrorResponse;

// TODO: Create a function to handle API responses
function handleApiResponse<T>(response: ApiResponse<T>): void {
    switch (response.status) {
        case "loading":
            console.log(`🔄 ${response.message}`);
            break;
        case "success":
            console.log(`✅ Success!`);
            console.log("Data:", response.data);
            break;
        case "error":
            console.log(`❌ Error: ${response.error} (Code: ${response.errorCode})`);
            break;
    }
}

// TODO: Test with different response types
const loadingResponse: LoadingResponse = {
    status: "loading",
    message: "Fetching user data..."
};

const successResponse: SuccessResponse<{ id: number; name: string }> = {
    status: "success",
    data: { id: 1, name: "John Doe" },
    timestamp: new Date()
};

const errorResponse: ErrorResponse = {
    status: "error",
    error: "User not found",
    errorCode: 404
};

handleApiResponse(loadingResponse);
handleApiResponse(successResponse);
handleApiResponse(errorResponse);

// Exercise 5: Optional Chaining and Nullish Coalescing
console.log("\n5. Optional Chaining and Nullish Coalescing");
// TODO: Create nested interfaces with optional properties
interface Address {
    street: string;
    city: string;
    state?: string;
    country: string;
    zipCode?: string;
}

interface Company {
    name: string;
    address?: Address;
    employees?: number;
}

interface PersonProfile {
    id: number;
    name: string;
    email: string;
    company?: Company;
    phone?: string;
}

// TODO: Create a function that safely accesses nested properties
// Use optional chaining (?.) and nullish coalescing (??) operators
function getPersonInfo(person: PersonProfile): string {
    const name = person.name;
    const email = person.email;
    const phone = person.phone ?? "No phone provided";
    const companyName = person.company?.name ?? "No company provided";
    const companyCity = person.company?.address?.city ?? "Unknown city";
    const companyState = person.company?.address?.state ?? "Unknown state";
    const employeeCount = person.company?.employees ?? 0;

    return `
    Name: ${name}
    Email: ${email}
    Phone: ${phone}
    Company: ${companyName}
    Location: ${companyCity}, ${companyState}
    Company Size: ${employeeCount} employees
    `;
}

// TODO: Test with different data scenarios
const person1: PersonProfile = {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "123-456-7890",
    company: {
        name: "Tech Corp",
        address: {
            street: "123 Tech Street",
            city: "San Francisco",
            state: "CA",
            country: "USA",
            zipCode: "94105"
        },
        employees: 500
    }
};

const person2: PersonProfile = {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com"
    // No phone, no company
};

console.log("Person 1 Info:", getPersonInfo(person1));
console.log("Person 2 Info:", getPersonInfo(person2));

// Exercise 6: Generic Type Guards
console.log("\n6. Generic Type Guards");
// TODO: Create a generic type guard function
function isArrayOfType<T>(
    value: unknown,
    typeChecker: (item: unknown) => item is T
): value is T[] {
    return Array.isArray(value) && value.every(typeChecker);
}

// TODO: Create specific type checker functions
function isString(value: unknown): value is string {
    return typeof value === "string";
}

function isNumber(value: unknown): value is number {
    return typeof value === "number";
}

// TODO: Create an object type checker
interface SimpleUser {
    name: string;
    age: number;
}

function isSimpleUser(value: unknown): value is SimpleUser {
    return (
        typeof value === "object" &&
        value !== null &&
        "name" in value &&
        "age" in value &&
        typeof (value as any).name === "string" &&
        typeof (value as any).age === "number"
    );
}

// TODO: Test your generic type guard
const mixedDataArray: unknown[] = ["hello", "world", 123];
const stringDataArray: unknown[] = ["hello", "world", "typescript"];
const userDataArray: unknown[] = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 }
];

console.log("Mixed array is string array:", isArrayOfType(mixedDataArray, isString));
console.log("String array is string array:", isArrayOfType(stringDataArray, isString));
console.log("User array is SimpleUser array:", isArrayOfType(userDataArray, isSimpleUser));

console.log("\n🎯 Complete the TODO items above to practice Advanced TypeScript!");
console.log("Check advanced-exercises-solutions.ts when you're done!");

// Challenge Exercise: Create your own advanced type system
console.log("\n🏆 Challenge: Create a type-safe event system");
// TODO: Design and implement a type-safe event emitter system
// Hint: Use string literal types, generic constraints, and mapped types

// Your challenge starts here...
interface EventMap {
    "user:login": { userId: number; timestamp: Date };
    "user:logout": { userId: number };
    "data:update": { tableName: string; recordId: number };
}

class TypedEventEmitter<T extends Record<string, any>> {
    private listeners: {
        [K in keyof T]?: Array<(data: T[K]) => void>;
    } = {};

    on<K extends keyof T>(event: K, listener: (data: T[K]) => void): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event]!.push(listener);
    }

    emit<K extends keyof T>(event: K, data: T[K]): void {
        this.listeners[event]?.forEach((listener) => listener(data));
    }
}

// // Usage example
const eventEmitter = new TypedEventEmitter<EventMap>();

// Type-safe event listeners
eventEmitter.on("user:login", (data) => {
    console.log(`User ${data.userId} logged in at ${data.timestamp}`);
});

eventEmitter.on("user:logout", (data) => {
    console.log(`User ${data.userId} logged out`);
});

eventEmitter.on("data:update", (data) => {
    console.log(`Updated record ${data.recordId} in table ${data.tableName}`);
});

// Type-safe event emission
eventEmitter.emit("user:login", { userId: 123, timestamp: new Date() });
eventEmitter.emit("user:logout", { userId: 123 });
eventEmitter.emit("data:update", { tableName: "users", recordId: 456 });


console.log("💡 Bonus: Try implementing the type-safe event system challenge!");
