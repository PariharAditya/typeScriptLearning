// Lesson 3: Classes and Inheritance
console.log("📚 Lesson 3: Classes and Inheritance");

// Basic class
class Animal {
    public name: string;
    protected age: number;
    private species: string;

    constructor(name: string, age: number, species: string) {
        this.name = name;
        this.age = age;
        this.species = species;
    }

    public makeSound(): void {
        console.log(`${this.name} makes a sound`);
    }

    protected getAge(): number {
        return this.age;
    }

    private getSpecies(): string {
        return this.species;
    }

    public getInfo(): string {
        return `${this.name} is a ${this.getSpecies()} and is ${this.age} years old`;
    }
}

// Inheritance
class Dog extends Animal {
    private breed: string;

    constructor(name: string, age: number, breed: string) {
        super(name, age, "Dog");
        this.breed = breed;
    }

    public override makeSound(): void {
        console.log(`${this.name} barks: Woof! Woof!`);
    }

    public getBreed(): string {
        return this.breed;
    }

    public getDogInfo(): string {
        return `${this.getInfo()} and is a ${this.breed}`;
    }
}

// Using classes
const myDog = new Dog("Buddy", 3, "Golden Retriever");
console.log(myDog.getDogInfo());
myDog.makeSound();

// Abstract classes
abstract class Shape {
    abstract calculateArea(): number;

    public displayInfo(): void {
        console.log(`Area: ${this.calculateArea()}`);
    }
}

class Circle extends Shape {
    private radius: number;

    constructor(radius: number) {
        super();
        this.radius = radius;
    }

    calculateArea(): number {
        return Math.PI * this.radius * this.radius;
    }
}

class Rectangle extends Shape {
    private width: number;
    private height: number;

    constructor(width: number, height: number) {
        super();
        this.width = width;
        this.height = height;
    }

    calculateArea(): number {
        return this.width * this.height;
    }
}

const circle = new Circle(5);
const rectangle = new Rectangle(4, 6);

console.log("Circle:");
circle.displayInfo();

console.log("Rectangle:");
rectangle.displayInfo();
