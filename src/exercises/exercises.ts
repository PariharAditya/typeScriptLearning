// TypeScript Practice Exercises
// Complete these exercises to practice what you've learned!

console.log("🏋️ TypeScript Practice Exercises");

// Exercise 1: Basic Types
// TODO: Create variables with proper type annotations
let stuName: string = "Your Name";
let stuAge: number = 20;
let enrolled: boolean = true;
console.log(`Student: ${stuName}, Age: ${stuAge}, Enrolled: ${enrolled}`);
// Exercise 2: Functions
// TODO: Create a function that takes two numbers and returns their sum
function calculateSum(a: number, b: number): number {
    return a + b;
}
console.log("Sum of 5 and 3:", calculateSum(5, 3));

// Exercise 3: Arrays
// TODO: Create an array of your favorite fruits (strings)
let favoriteFruits: string[] = ["Apple", "Banana", "Orange", "Mango"];
for (let i = 0; i < favoriteFruits.length; i++) {
    const element = favoriteFruits[i];
    console.log("Favorite fruit:", element);
}

// Exercise 4: Objects
// TODO: Create an object representing a book with title, author, and pages
let book: {
    title: string,
    author: string,
    pages: number
} = {
    title: "Learning TypeScript",
    author: "TypeScript Expert",
    pages: 300
};

// Exercise 5: Interface
// TODO: Create an interface for a Car with make, model, and year properties
interface Car {
    make : string;
    model: string;
    year: number;
}

// TODO: Create a car object using the interface
let myCar: Car = {
    make : "BMW",
    model : "M3",
    year: 2021
  
};
console.log("My car:", myCar);

// Exercise 6: Class
// TODO: Create a Student class with name, age, and a method to introduce themselves
class Student {
    public name : string;
    public age : number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    public introduce(): string {
        return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
    }
}
let s1 = new Student("John Doe", 22);
console.log(s1.introduce());

// Exercise 7: Generic Function
// TODO: Create a generic function that returns the last item in an array
function getLastItem<T>(items: T[]): T | undefined {
    return items[items.length-1];
}
const numberArray = [1, 2, 3, 4, 5];
const stringArray = ["apple", "banana", "cherry"];
console.log("Last number:", getLastItem(numberArray));
console.log("Last string:", getLastItem(stringArray));

// Exercise 8: Union Types
// TODO: Create a function that accepts either a string or number and returns its length/value
function getLength(input: string | number) : number {
    if (typeof input === "string") {
        return input.length;
    }
    return input; // If it's a number, just return the number itself
}
console.log("Length of 'Hello':", getLength("Hello"));
console.log("Value of 42:", getLength(42));

console.log("Complete the TODO items above to practice TypeScript!");
console.log("Check the solutions in exercises-solutions.ts when you're done!");
