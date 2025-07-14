# Lesson 3: State Management with useState Hook

## What is State?

State is data that can change over time in your React component. Unlike props (which are read-only), state is mutable and managed internally by the component.

## useState Hook

The `useState` hook is the most fundamental hook in React for managing state in functional components.

### Basic Syntax

```tsx
import React, { useState } from "react";

const [state, setState] = useState(initialValue);
```

- `state`: Current value of the state
- `setState`: Function to update the state
- `initialValue`: Initial value when component first renders

## TypeScript with useState

### 1. Basic Types

```tsx
import React, { useState } from "react";

const Counter: React.FC = () => {
  // TypeScript can infer the type
  const [count, setCount] = useState(0); // number
  const [name, setName] = useState(""); // string
  const [isVisible, setIsVisible] = useState(true); // boolean

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
};
```

### 2. Explicit Types

```tsx
import React, { useState } from "react";

const UserForm: React.FC = () => {
  // Explicit typing
  const [age, setAge] = useState<number>(0);
  const [user, setUser] = useState<string | null>(null);

  return (
    <div>
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
      />
    </div>
  );
};
```

### 3. Object State

```tsx
import React, { useState } from "react";

interface User {
  name: string;
  email: string;
  age: number;
}

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    age: 0,
  });

  const updateUser = (field: keyof User, value: string | number) => {
    setUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div>
      <input
        value={user.name}
        onChange={(e) => updateUser("name", e.target.value)}
        placeholder="Name"
      />
      <input
        value={user.email}
        onChange={(e) => updateUser("email", e.target.value)}
        placeholder="Email"
      />
    </div>
  );
};
```

### 4. Array State

```tsx
import React, { useState } from "react";

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos((prev) => [...prev, inputValue]);
      setInputValue("");
    }
  };

  const removeTodo = (index: number) => {
    setTodos((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add todo"
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => removeTodo(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
```

## State Update Patterns

### 1. Functional Updates

When new state depends on previous state:

```tsx
const [count, setCount] = useState(0);

// ❌ Don't do this
setCount(count + 1);

// ✅ Do this
setCount((prev) => prev + 1);
```

### 2. Object Updates

Always spread the previous state:

```tsx
const [user, setUser] = useState({ name: "", email: "" });

// ❌ Don't do this (mutating)
user.name = "John";

// ✅ Do this
setUser((prev) => ({ ...prev, name: "John" }));
```

### 3. Array Updates

```tsx
const [items, setItems] = useState<string[]>([]);

// Add item
setItems((prev) => [...prev, newItem]);

// Remove item
setItems((prev) => prev.filter((item) => item !== itemToRemove));

// Update item
setItems((prev) =>
  prev.map((item) => (item.id === targetId ? { ...item, updated: true } : item))
);
```

## Event Handling with State

### 1. Form Input

```tsx
const [input, setInput] = useState("");

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setInput(e.target.value);
};

return (
  <input value={input} onChange={handleChange} placeholder="Type something" />
);
```

### 2. Button Clicks

```tsx
const [count, setCount] = useState(0);

const handleIncrement = () => {
  setCount((prev) => prev + 1);
};

return <button onClick={handleIncrement}>Clicked {count} times</button>;
```

### 3. Form Submission

```tsx
const [formData, setFormData] = useState({
  name: "",
  email: "",
});

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  console.log("Form submitted:", formData);
};

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};
```

## State vs Props

| Props                        | State                        |
| ---------------------------- | ---------------------------- |
| Read-only                    | Mutable                      |
| Passed from parent           | Managed internally           |
| Cause re-render when changed | Cause re-render when updated |
| External data                | Internal data                |

## Best Practices

1. **Initialize state properly** - Use appropriate initial values
2. **Use functional updates** - When new state depends on previous state
3. **Don't mutate state directly** - Always use setState function
4. **Keep state minimal** - Only store what changes
5. **Use multiple state variables** - Instead of one large object
6. **Use proper TypeScript types** - For type safety

## Common Patterns

### 1. Toggle Pattern

```tsx
const [isVisible, setIsVisible] = useState(false);

const toggle = () => setIsVisible((prev) => !prev);
```

### 2. Counter Pattern

```tsx
const [count, setCount] = useState(0);

const increment = () => setCount((prev) => prev + 1);
const decrement = () => setCount((prev) => prev - 1);
const reset = () => setCount(0);
```

### 3. Form Pattern

```tsx
const [formData, setFormData] = useState({
  name: "",
  email: "",
  message: "",
});

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData((prev) => ({
    ...prev,
    [e.target.name]: e.target.value,
  }));
};
```

## Next: Event Handling & Forms

In the next lesson, we'll dive deeper into handling events and building forms with validation!
