// Advanced TypeScript Exercises - Solutions
// Compare your solutions with these!

console.log("✅ Advanced TypeScript Exercises - Solutions");

// Exercise 1: Union Types and Type Guards
console.log("\n1. Union Types and Type Guards - Solution");
type PaymentMethod = "credit_card" | "paypal" | "bank_transfer" | "cash";

function processPayment(method: PaymentMethod, amount: number): string {
    switch (method) {
        case "credit_card":
            return `Processing $${amount} via Credit Card`;
        case "paypal":
            return `Processing $${amount} via PayPal`;
        case "bank_transfer":
            return `Processing $${amount} via Bank Transfer`;
        case "cash":
            return `Processing $${amount} in Cash`;
        default:
            const _exhaustiveCheck: never = method;
            return _exhaustiveCheck;
    }
}

console.log(processPayment("credit_card", 100));
console.log(processPayment("paypal", 250));

// Exercise 2: Intersection Types
console.log("\n2. Intersection Types - Solution");
interface CanRead {
    read(item: string): void;
}

interface CanWrite {
    write(item: string): void;
}

interface CanDelete {
    delete(item: string): void;
}

type Viewer = CanRead;
type Editor = CanRead & CanWrite;
type Admin = CanRead & CanWrite & CanDelete;

class SystemUser implements Admin {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

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

const systemAdmin = new SystemUser("Alice");
systemAdmin.read("document");
systemAdmin.write("report");
systemAdmin.delete("old_file");

// Exercise 3: Custom Type Guards
console.log("\n3. Custom Type Guards - Solution");
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

function isCircleShape(shape: GeometricShape): shape is CircleShape {
    return shape.kind === "circle";
}

function isRectangleShape(shape: GeometricShape): shape is RectangleShape {
    return shape.kind === "rectangle";
}

function isTriangleShape(shape: GeometricShape): shape is TriangleShape {
    return shape.kind === "triangle";
}

function calculateShapeArea(shape: GeometricShape): number {
    if (isCircleShape(shape)) {
        return Math.PI * shape.radius * shape.radius;
    } else if (isRectangleShape(shape)) {
        return shape.width * shape.height;
    } else if (isTriangleShape(shape)) {
        return (shape.base * shape.height) / 2;
    }
    const _exhaustiveCheck: never = shape;
    return _exhaustiveCheck;
}

const circleShape: CircleShape = { kind: "circle", radius: 5 };
const rectangleShape: RectangleShape = { kind: "rectangle", width: 10, height: 6 };
const triangleShape: TriangleShape = { kind: "triangle", base: 8, height: 4 };

console.log(`Circle area: ${calculateShapeArea(circleShape)}`);
console.log(`Rectangle area: ${calculateShapeArea(rectangleShape)}`);
console.log(`Triangle area: ${calculateShapeArea(triangleShape)}`);

// Exercise 4: Discriminated Unions for API States
console.log("\n4. Discriminated Unions for API States - Solution");
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

function handleApiResponse<T>(response: ApiResponse<T>): void {
    switch (response.status) {
        case "loading":
            console.log(`🔄 ${response.message}`);
            break;
        case "success":
            console.log(`✅ Success! Data received at ${response.timestamp}`);
            console.log("Data:", response.data);
            break;
        case "error":
            console.log(`❌ Error ${response.errorCode}: ${response.error}`);
            break;
    }
}

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
console.log("\n5. Optional Chaining and Nullish Coalescing - Solution");
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

function getPersonInfo(person: PersonProfile): string {
    const name = person.name;
    const email = person.email;
    const phone = person.phone ?? "No phone provided";
    const companyName = person.company?.name ?? "No company";
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
};

console.log("Person 1 Info:", getPersonInfo(person1));
console.log("Person 2 Info:", getPersonInfo(person2));

// Exercise 6: Generic Type Guards
console.log("\n6. Generic Type Guards - Solution");
function isArrayOfType<T>(
    value: unknown,
    typeChecker: (item: unknown) => item is T
): value is T[] {
    return Array.isArray(value) && value.every(typeChecker);
}

function isString(value: unknown): value is string {
    return typeof value === "string";
}

function isNumber(value: unknown): value is number {
    return typeof value === "number";
}

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

const mixedDataArray: unknown[] = ["hello", "world", 123];
const stringDataArray: unknown[] = ["hello", "world", "typescript"];
const userDataArray: unknown[] = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 }
];

console.log("Mixed array is string array:", isArrayOfType(mixedDataArray, isString));
console.log("String array is string array:", isArrayOfType(stringDataArray, isString));
console.log("User array is SimpleUser array:", isArrayOfType(userDataArray, isSimpleUser));

console.log("\n🎯 Advanced TypeScript Exercises Solutions Complete!");
console.log("Great job working through these advanced concepts!");

// Bonus Challenge: Type-safe Event System Solution
console.log("\n🏆 Bonus Challenge: Type-safe Event System - Solution");

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
        const eventListeners = this.listeners[event];
        if (eventListeners) {
            eventListeners.forEach(listener => listener(data));
        }
    }

    off<K extends keyof T>(event: K, listener: (data: T[K]) => void): void {
        const eventListeners = this.listeners[event];
        if (eventListeners) {
            const index = eventListeners.indexOf(listener);
            if (index > -1) {
                eventListeners.splice(index, 1);
            }
        }
    }
}

// Usage example
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

console.log("🌟 Bonus challenge completed! You've mastered advanced TypeScript patterns!");
