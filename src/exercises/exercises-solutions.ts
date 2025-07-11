// // TypeScript Practice Exercises - Solutions
// // Compare your solutions with these!

// console.log("✅ TypeScript Practice Exercises - Solutions");

// // Exercise 1: Basic Types
// let studentName: string = "Your Name";
// let studentAge: number = 20;
// let isEnrolled: boolean = true;

// console.log(`Student: ${studentName}, Age: ${studentAge}, Enrolled: ${isEnrolled}`);

// // Exercise 2: Functions
// function calculateSum(a: number, b: number): number {
//     return a + b;
// }

// console.log("Sum of 5 and 3:", calculateSum(5, 3));

// // Exercise 3: Arrays
// let favoriteFruits: string[] = ["Apple", "Banana", "Orange", "Mango"];
// console.log("Favorite fruits:", favoriteFruits);

// // Exercise 4: Objects
// let book: {
//     title: string;
//     author: string;
//     pages: number;
// } = {
//     title: "Learning TypeScript",
//     author: "TypeScript Expert",
//     pages: 300
// };

// console.log("Book:", book);

// // Exercise 5: Interface
// interface Car {
//     make: string;
//     model: string;
//     year: number;
// }

// let myCar: Car = {
//     make: "Toyota",
//     model: "Camry",
//     year: 2023
// };

// console.log("My car:", myCar);

// // Exercise 6: Class
// class Student {
//     public name: string;
//     public age: number;

//     constructor(name: string, age: number) {
//         this.name = name;
//         this.age = age;
//     }

//     public introduce(): string {
//         return `Hi, I'm ${this.name} and I'm ${this.age} years old.`;
//     }
// }

// const student = new Student("Alice", 22);
// console.log(student.introduce());

// // Exercise 7: Generic Function
// function getLastItem<T>(items: T[]): T | undefined {
//     return items.length > 0 ? items[items.length - 1] : undefined;
// }

// const numbersArray = [1, 2, 3, 4, 5];
// const fruits = ["apple", "banana", "cherry"];

// console.log("Last number:", getLastItem(numbersArray));
// console.log("Last fruit:", getLastItem(fruits));

// // Exercise 8: Union Types
// function getLength(input: string | number): number {
//     if (typeof input === "string") {
//         return input.length;
//     } else {
//         return input;
//     }
// }

// console.log("Length of 'hello':", getLength("hello"));
// console.log("Value of 42:", getLength(42));

// console.log("Great job completing the exercises! 🎉");
