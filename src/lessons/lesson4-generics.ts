// Lesson 4: Generics
console.log("📚 Lesson 4: Generics");

// Basic generic function
function identity<T>(arg: T): T {
    return arg;
}

console.log("Identity with string:", identity<string>("Hello"));
console.log("Identity with number:", identity<number>(42));
console.log("Identity with boolean:", identity<boolean>(true));

// Generic array function
function getFirstItem<T>(items: T[]): T | undefined {
    return items.length > 0 ? items[0] : undefined;
}

const numbersList = [1, 2, 3, 4, 5];
const namesList = ["Alice", "Bob", "Charlie"];

console.log("First number:", getFirstItem(numbersList));
console.log("First name:", getFirstItem(namesList));

// Generic interface
interface Container<T> {
    value: T;
    getValue(): T;
    setValue(value: T): void;
}

class Box<T> implements Container<T> {
    private _value: T;

    constructor(value: T) {
        this._value = value;
    }

    get value(): T {
        return this._value;
    }

    getValue(): T {
        return this._value;
    }

    setValue(value: T): void {
        this._value = value;
    }
}

const stringBox = new Box<string>("Hello, Generics!");
const numberBox = new Box<number>(123);
const demo = new Box<string | number>("Generic Demo");

console.log("String box:", stringBox.getValue());
console.log("Number box:", numberBox.getValue());
console.log("Demo box:", demo.getValue());

// Generic constraints
interface Lengthwise {
    length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
    console.log("Length:", arg.length);
    return arg;
}

logLength("This is a string");
logLength([1, 2, 3, 4]);
logLength({ length: 10, value: "test" });

// Multiple type parameters
function pair<T, U>(first: T, second: U): [T, U] {
    return [first, second];
}

const stringNumberPair = pair("Hello", 42);
const booleanArrayPair = pair(true, [1, 2, 3]);

console.log("String-Number pair:", stringNumberPair);
console.log("Boolean-Array pair:", booleanArrayPair);
