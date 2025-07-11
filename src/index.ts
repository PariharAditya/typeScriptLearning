// Welcome to TypeScript Learning!
// This is your main entry point

console.log("🎉 Welcome to TypeScript Learning!");
console.log("Let's start with some basic TypeScript concepts!");

// Basic Types
const message: string = "Hello, TypeScript!";
const count: number = 42;
const isLearning: boolean = true;

console.log(`Message: ${message}`);
console.log(`Count: ${count}`);
console.log(`Is Learning: ${isLearning}`);

// Simple function with type annotations
function greet(name: string): string {
    return `Hello, ${name}! Welcome to TypeScript!`;
}

console.log(greet("Learner"));
