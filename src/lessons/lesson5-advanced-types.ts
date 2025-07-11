// Lesson 5: Advanced Types and Type Guards
console.log("📚 Lesson 5: Advanced Types and Type Guards");

// Union Types with Type Guards
type ApiStatus = "loading" | "success" | "error";
type EmployeeRole = "admin" | "user" | "guest";

function handleApiStatus(status: ApiStatus): void {
    // Type guard using switch statement
    switch (status) {
        case "loading":
            console.log("⏳ Loading...");
            break;
        case "success":
            console.log("✅ Success!");
            break;
        case "error":
            console.log("❌ Error occurred!");
            break;
        default:
            // TypeScript ensures all cases are handled
            const _exhaustiveCheck: never = status;
            return _exhaustiveCheck;
    }
}

// Testing union types
handleApiStatus("loading");
handleApiStatus("success");
handleApiStatus("error");

// Intersection Types
interface PersonInfo {
    name: string;
    age: number;
}

interface EmployeeInfo {
    employeeId: number;
    department: string;
}

// Intersection type combines both interfaces
type EmployeePerson = PersonInfo & EmployeeInfo;

const employeeData: EmployeePerson = {
    name: "John Smith",
    age: 30,
    employeeId: 12345,
    department: "Engineering"
};

console.log("Employee:", employeeData);

// Type Guards with typeof
function processValue(value: string | number | boolean): string {
    if (typeof value === "string") {
        return `String: ${value.toUpperCase()}`;
    } else if (typeof value === "number") {
        return `Number: ${value.toFixed(2)}`;
    } else {
        return `Boolean: ${value ? "TRUE" : "FALSE"}`;
    }
}

console.log(processValue("hello"));
console.log(processValue(42.567));
console.log(processValue(true));

// Custom Type Guards
interface DogPet {
    type: "dog";
    bark(): void;
}

interface CatPet {
    type: "cat";
    meow(): void;
}

type Pet = DogPet | CatPet;

// Type guard function
function isDogPet(pet: Pet): pet is DogPet {
    return pet.type === "dog";
}

function petAction(pet: Pet): void {
    if (isDogPet(pet)) {
        pet.bark(); // TypeScript knows this is a Dog
    } else {
        pet.meow(); // TypeScript knows this is a Cat
    }
}

const myDogPet: DogPet = {
    type: "dog",
    bark: () => console.log("Woof! Woof!")
};

const myCatPet: CatPet = {
    type: "cat",
    meow: () => console.log("Meow!")
};

petAction(myDogPet);
petAction(myCatPet);

// Discriminated Unions
interface LoadingState {
    status: "loading";
}

interface SuccessState {
    status: "success";
    data: string;
}

interface ErrorState {
    status: "error";
    error: string;
}

type ApiState = LoadingState | SuccessState | ErrorState;

function handleApiState(state: ApiState): void {
    switch (state.status) {
        case "loading":
            console.log("🔄 Loading data...");
            break;
        case "success":
            console.log(`✅ Data loaded: ${state.data}`);
            break;
        case "error":
            console.log(`❌ Error: ${state.error}`);
            break;
    }
}

// Testing discriminated unions
handleApiState({ status: "loading" });
handleApiState({ status: "success", data: "User profile loaded" });
handleApiState({ status: "error", error: "Network connection failed" });

// Optional Chaining and Nullish Coalescing
interface UserProfile {
    id: number;
    name: string;
    address?: {
        street: string;
        city: string;
        country?: string;
    };
}

const userProfile1: UserProfile = {
    id: 1,
    name: "Alice",
    address: {
        street: "123 Main St",
        city: "New York"
    }
};

const userProfile2: UserProfile = {
    id: 2,
    name: "Bob"
};

function getUserInfo(user: UserProfile): void {
    console.log(`User: ${user.name}`);

    // Optional chaining
    console.log(`Street: ${user.address?.street ?? "Not provided"}`);
    console.log(`City: ${user.address?.city ?? "Not provided"}`);
    console.log(`Country: ${user.address?.country ?? "Not specified"}`);
}

getUserInfo(userProfile1);
getUserInfo(userProfile2);

console.log("🎯 Advanced types help create more robust and type-safe code!");
