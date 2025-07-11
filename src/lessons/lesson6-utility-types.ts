// Lesson 6: Utility Types and Mapped Types
console.log("📚 Lesson 6: Utility Types and Mapped Types");

// Base interface for examples
interface UserData {
    id: number;
    name: string;
    email: string;
    age: number;
    isActive: boolean;
}

// 1. Partial<T> - Makes all properties optional
console.log("1. Partial<T> - Makes all properties optional");
type PartialUser = Partial<UserData>;

function updateUser(id: number, updates: PartialUser): void {
    console.log(`Updating user ${id} with:`, updates);
}

updateUser(1, { name: "John Updated" });
updateUser(2, { age: 25, isActive: false });

// 2. Required<T> - Makes all properties required
console.log("\n2. Required<T> - Makes all properties required");
interface OptionalUser {
    id?: number;
    name?: string;
    email?: string;
}

type RequiredUser = Required<OptionalUser>;

const completeUser: RequiredUser = {
    id: 1,
    name: "Alice",
    email: "alice@example.com"
};

console.log("Complete user:", completeUser);

// 3. Pick<T, K> - Pick specific properties
console.log("\n3. Pick<T, K> - Pick specific properties");
type UserSummary = Pick<UserData, "id" | "name" | "email">;

const userSummary: UserSummary = {
    id: 1,
    name: "Bob",
    email: "bob@example.com"
};

console.log("User summary:", userSummary);

// 4. Omit<T, K> - Omit specific properties
console.log("\n4. Omit<T, K> - Omit specific properties");
type UserWithoutId = Omit<UserData, "id">;

const newUser: UserWithoutId = {
    name: "Charlie",
    email: "charlie@example.com",
    age: 28,
    isActive: true
};

console.log("New user (without ID):", newUser);

// 5. Record<K, T> - Create object type with specific keys and values
console.log("\n5. Record<K, T> - Create object type");
type SystemRole = "admin" | "user" | "guest";
type RolePermissions = Record<SystemRole, string[]>;

const permissions: RolePermissions = {
    admin: ["read", "write", "delete", "manage"],
    user: ["read", "write"],
    guest: ["read"]
};

console.log("Role permissions:", permissions);

// 6. Readonly<T> - Makes all properties readonly
console.log("\n6. Readonly<T> - Makes all properties readonly");
type ReadonlyUser = Readonly<UserData>;

const readonlyUser: ReadonlyUser = {
    id: 1,
    name: "David",
    email: "david@example.com",
    age: 30,
    isActive: true
};

// readonlyUser.name = "New Name"; // This would cause an error
console.log("Readonly user:", readonlyUser);

// 7. ReturnType<T> - Extract return type of function
console.log("\n7. ReturnType<T> - Extract return type");
function createUser(name: string, email: string): { id: number; name: string; email: string } {
    return {
        id: Math.random(),
        name,
        email
    };
}

type CreateUserReturn = ReturnType<typeof createUser>;

const newUserData: CreateUserReturn = createUser("Eve", "eve@example.com");
console.log("New user data:", newUserData);

// 8. Parameters<T> - Extract parameter types of function
console.log("\n8. Parameters<T> - Extract parameter types");
function greetUser(name: string, age: number, isVip: boolean): string {
    return `Hello ${name}, you are ${age} years old${isVip ? " (VIP)" : ""}`;
}

type GreetUserParams = Parameters<typeof greetUser>;

const greetParams: GreetUserParams = ["Frank", 35, true];
console.log(greetUser(...greetParams));

// 9. Custom Mapped Types
console.log("\n9. Custom Mapped Types");

// Make all properties optional and nullable
type OptionalNullable<T> = {
    [P in keyof T]?: T[P] | null;
};

type NullableUser = OptionalNullable<UserData>;

const nullableUser: NullableUser = {
    id: 1,
    name: "Grace",
    email: null,
    age: 25
    // isActive is omitted (optional)
};

console.log("Nullable user:", nullableUser);

// Create string versions of all properties
type StringifyProperties<T> = {
    [P in keyof T]: string;
};

type StringUser = StringifyProperties<UserData>;

const stringUser: StringUser = {
    id: "1",
    name: "Henry",
    email: "henry@example.com",
    age: "30",
    isActive: "true"
};

console.log("String user:", stringUser);

// 10. Conditional Types
console.log("\n10. Conditional Types");

// Check if type is array
type IsArray<T> = T extends any[] ? true : false;

type StringIsArray = IsArray<string>;   // false
type NumberArrayIsArray = IsArray<number[]>; // true

// Extract array element type
type ArrayElement<T> = T extends (infer U)[] ? U : never;

type StringArrayElement = ArrayElement<string[]>; // string
type NumberArrayElement = ArrayElement<number[]>; // number

console.log("Conditional types help create flexible type transformations!");

// 11. Template Literal Types
console.log("\n11. Template Literal Types");

type EventName = "click" | "scroll" | "mousemove";
type EventHandler<T extends string> = `on${Capitalize<T>}`;

type ClickHandler = EventHandler<"click">;     // "onClick"
type ScrollHandler = EventHandler<"scroll">;   // "onScroll"

type AllEventHandlers = EventHandler<EventName>; // "onClick" | "onScroll" | "onMousemove"

// Usage example
type ButtonProps = {
    [K in AllEventHandlers]?: () => void;
} & {
    text: string;
};

const button: ButtonProps = {
    text: "Click me",
    onClick: () => console.log("Button clicked!"),
    onScroll: () => console.log("Button scrolled!")
};

console.log("Button with event handlers:", button);
console.log("🚀 Utility types make TypeScript incredibly powerful and flexible!");
