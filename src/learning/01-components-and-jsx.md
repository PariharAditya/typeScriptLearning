# Lesson 1: React Components & JSX with TypeScript

## What is React?

React is a JavaScript library for building user interfaces. It lets you create reusable UI components and manage the state of your application efficiently.

## What is JSX?

JSX is a syntax extension for JavaScript that looks similar to HTML. It allows you to write HTML-like code inside JavaScript/TypeScript files.

## React Components

Components are the building blocks of React applications. There are two main types:

1. **Function Components** (Modern approach - we'll focus on this)
2. **Class Components** (Legacy approach)

## TypeScript with React

TypeScript adds static type checking to React, making your code more robust and easier to debug.

## Basic Function Component Structure

```tsx
import React from "react";

// Basic function component
function Welcome(): JSX.Element {
  return <h1>Hello, World!</h1>;
}

// Alternative syntax with arrow function
const Welcome2 = (): JSX.Element => {
  return <h1>Hello, World!</h1>;
};

// Even shorter syntax for simple returns
const Welcome3 = (): JSX.Element => <h1>Hello, World!</h1>;

export default Welcome;
```

## Key Concepts:

### 1. JSX Rules

- Must return a single parent element (or use React.Fragment)
- Use `className` instead of `class`
- Use `htmlFor` instead of `for`
- Self-closing tags must end with `/>`

### 2. TypeScript Types

- Function components return `JSX.Element` or `React.ReactElement`
- You can also use `React.FC<PropsType>` (Function Component type)

### 3. Embedding JavaScript in JSX

Use curly braces `{}` to embed JavaScript expressions:

```tsx
const name = "John";
const element = <h1>Hello, {name}!</h1>;
```

## Examples:

### Example 1: Simple Greeting Component

```tsx
import React from "react";

const Greeting = (): JSX.Element => {
  const userName = "Alice";
  const currentTime = new Date().toLocaleTimeString();

  return (
    <div>
      <h1>Hello, {userName}!</h1>
      <p>Current time: {currentTime}</p>
    </div>
  );
};

export default Greeting;
```

### Example 2: Component with Conditional Rendering

```tsx
import React from "react";

const UserStatus = (): JSX.Element => {
  const isLoggedIn = true;

  return (
    <div>{isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please log in</h1>}</div>
  );
};

export default UserStatus;
```

### Example 3: Component with List Rendering

```tsx
import React from "react";

const TodoList = (): JSX.Element => {
  const todos = ["Learn React", "Learn TypeScript", "Build an app"];

  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>{todo}</li>
      ))}
    </ul>
  );
};

export default TodoList;
```

## Next: Props and Component Communication

In the next lesson, we'll learn how to pass data between components using props.
