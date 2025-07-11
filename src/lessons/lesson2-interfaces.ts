// Lesson 2: Interfaces and Type Aliases
console.log("📚 Lesson 2: Interfaces and Type Aliases");

// Interface definition
interface User {
    id: number;
    name: string;
    email: string;
    age?: number; // Optional property
}

// Using the interface
const user1: User = {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    age: 28
};

const user2: User = {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com"
    // age is optional, so we can omit it
};

console.log("User 1:", user1);
console.log("User 2:", user2);

// Type aliases
type Status = "active" | "inactive" | "pending";
type UserRole = "admin" | "user" | "guest";

interface UserWithRole extends User {
    role: UserRole;
    status: Status;
}

const adminUser: UserWithRole = {
    id: 3,
    name: "Charlie Admin",
    email: "charlie@example.com",
    age: 35,
    role: "admin",
    status: "active"
};

console.log("Admin user:", adminUser);

// Function interfaces
interface Calculator {
    add(a: number, b: number): number;
    multiply(a: number, b: number): number;
    subtract(a: number, b: number): number; 
    divide?(a: number, b: number): number;
}

const myCalculator: Calculator = {
    add: (a, b) => a + b,
    multiply: (a, b) => a * b,
    subtract: (a, b) => a - b
};

console.log("Calculator add:", myCalculator.add(5, 3));
console.log("Calculator multiply:", myCalculator.multiply(4, 7));
console.log("Calculator subtract:", myCalculator.subtract(10, 6));