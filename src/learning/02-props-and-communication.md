# Lesson 2: Props & Component Communication

## What are Props?

Props (short for "properties") are a way to pass data from a parent component to a child component. Think of them as function parameters for React components.

## Key Concepts:

### 1. Props are Read-Only

- Props are immutable (cannot be changed by the child component)
- They flow down from parent to child (one-way data flow)
- If you need to modify data, use state (covered in next lesson)

### 2. TypeScript with Props

TypeScript allows us to define interfaces for our props, making our components type-safe.

## Basic Props Example

```tsx
import React from "react";

// Define props interface
interface WelcomeProps {
  name: string;
  age: number;
}

// Component using props
const Welcome: React.FC<WelcomeProps> = ({ name, age }) => {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>You are {age} years old.</p>
    </div>
  );
};

// Parent component passing props
const App: React.FC = () => {
  return (
    <div>
      <Welcome name="Alice" age={25} />
      <Welcome name="Bob" age={30} />
    </div>
  );
};
```

## Advanced Props Concepts

### 1. Optional Props

```tsx
interface UserProps {
  name: string;
  age?: number; // Optional prop
  email?: string; // Optional prop
}

const User: React.FC<UserProps> = ({ name, age, email }) => {
  return (
    <div>
      <h2>{name}</h2>
      {age && <p>Age: {age}</p>}
      {email && <p>Email: {email}</p>}
    </div>
  );
};
```

### 2. Default Props

```tsx
interface ButtonProps {
  text: string;
  color?: string;
  size?: "small" | "medium" | "large";
}

const Button: React.FC<ButtonProps> = ({
  text,
  color = "blue",
  size = "medium",
}) => {
  return (
    <button
      style={{
        backgroundColor: color,
        fontSize:
          size === "small" ? "12px" : size === "large" ? "18px" : "14px",
      }}
    >
      {text}
    </button>
  );
};
```

### 3. Function Props (Event Handlers)

```tsx
interface CounterProps {
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const Counter: React.FC<CounterProps> = ({
  count,
  onIncrement,
  onDecrement,
}) => {
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={onIncrement}>+</button>
      <button onClick={onDecrement}>-</button>
    </div>
  );
};
```

### 4. Array Props

```tsx
interface TodoListProps {
  todos: string[];
  title: string;
}

const TodoList: React.FC<TodoListProps> = ({ todos, title }) => {
  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
};
```

### 5. Object Props

```tsx
interface Person {
  name: string;
  age: number;
  email: string;
}

interface PersonCardProps {
  person: Person;
}

const PersonCard: React.FC<PersonCardProps> = ({ person }) => {
  return (
    <div>
      <h3>{person.name}</h3>
      <p>Age: {person.age}</p>
      <p>Email: {person.email}</p>
    </div>
  );
};
```

## Children Props

Special prop that allows you to pass JSX elements as children:

```tsx
interface CardProps {
  title: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "16px" }}>
      <h2>{title}</h2>
      {children}
    </div>
  );
};

// Usage
<Card title="My Card">
  <p>This is the content inside the card</p>
  <button>Click me</button>
</Card>;
```

## Best Practices

1. **Always define prop interfaces** for type safety
2. **Use descriptive prop names** that clearly indicate their purpose
3. **Keep props minimal** - don't pass unnecessary data
4. **Use default values** for optional props when appropriate
5. **Avoid deeply nested prop drilling** - we'll learn about Context API later

## Common Prop Types

```tsx
interface ComponentProps {
  // Basic types
  text: string;
  number: number;
  isActive: boolean;

  // Arrays
  items: string[];
  numbers: number[];

  // Objects
  user: { name: string; email: string };

  // Functions
  onClick: () => void;
  onSubmit: (data: string) => void;

  // Optional props
  className?: string;
  style?: React.CSSProperties;

  // Union types
  size: "small" | "medium" | "large";

  // Children
  children?: React.ReactNode;
}
```

## Next: State Management

In the next lesson, we'll learn about state management using the useState hook!
