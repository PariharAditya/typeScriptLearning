// Lesson 1: Basic Types in TypeScript
console.log("📚 Lesson 1: Basic Types");

// Primitive Types
let myName: string = "TypeScript Learner";
let age: number = 25;
let isStudent: boolean = true;
let nothing: null = null;
let notDefined: undefined = undefined;

console.log("String:", myName);
console.log("Number:", age);
console.log("Boolean:", isStudent);

// Arrays
let numbers: number[] = [1, 2, 3, 4, 5];
let names: string[] = ["Alice", "Bob", "Charlie"];
let mixed: (string | number)[] = [1, "hello", 2, "world"];

console.log("Numbers array:", numbers);
console.log("Names array:", names);
console.log("Mixed array:", mixed);

// Object types
let person: {
    name: string;
    age: number;
    isEmployed: boolean;
} = {
    name: "John Doe",
    age: 30,
    isEmployed: true
};

console.log("Person object:", person);

// Function types
function add(a: number, b: number): number {
    return a + b;
}

function sayHello(name: string): void {
    console.log(`Hello, ${name}!`);
}

function sayHelloToUser(User: string, age: number): string | number {
    return `Hello, ${User}! You are ${age} years old.`;
}

console.log("Addition result:", add(5, 3));
sayHello("TypeScript");
console.log(sayHelloToUser("Java User", 30));
