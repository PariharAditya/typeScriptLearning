# Lesson 4: Event Handling & Advanced Forms

## What are Events in React?

Events in React are SyntheticEvents - React's wrapper around native DOM events. They provide consistent behavior across different browsers and additional features.

## TypeScript Event Types

React provides specific TypeScript types for different events:

```tsx
import React from "react";

const EventExample: React.FC = () => {
  // Mouse Events
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Button clicked!", e.currentTarget);
  };

  // Form Events
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted!");
  };

  // Input Events
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Input value:", e.target.value);
  };

  // Keyboard Events
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log("Enter pressed!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Type something..."
      />
      <button onClick={handleClick}>Submit</button>
    </form>
  );
};
```

## Common Event Types

### 1. Mouse Events

```tsx
interface MouseEventProps {
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  onDoubleClick?: (e: React.MouseEvent<HTMLElement>) => void;
  onMouseEnter?: (e: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLElement>) => void;
  onMouseDown?: (e: React.MouseEvent<HTMLElement>) => void;
  onMouseUp?: (e: React.MouseEvent<HTMLElement>) => void;
}
```

### 2. Form Events

```tsx
interface FormEventProps {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}
```

### 3. Keyboard Events

```tsx
interface KeyboardEventProps {
  onKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLElement>) => void;
}
```

## Advanced Form Patterns

### 1. Controlled Components

All form elements are controlled by React state:

```tsx
import React, { useState } from "react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ControlledForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Message"
      />
      <button type="submit">Submit</button>
    </form>
  );
};
```

### 2. Form Validation with Custom Hooks

```tsx
import React, { useState } from 'react';

interface ValidationRules<T> {
  [K in keyof T]?: (value: T[K]) => string | undefined;
}

function useFormValidation<T>(
  initialValues: T,
  validationRules: ValidationRules<T>
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const validateField = (name: keyof T, value: T[keyof T]) => {
    const rule = validationRules[name];
    return rule ? rule(value) : undefined;
  };

  const setValue = (name: keyof T, value: T[keyof T]) => {
    setValues(prev => ({ ...prev, [name]: value }));

    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const setFieldTouched = (name: keyof T) => {
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const validateAll = () => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    for (const key in validationRules) {
      const error = validateField(key, values[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    }

    setErrors(newErrors);
    setTouched(Object.keys(validationRules).reduce((acc, key) => {
      acc[key as keyof T] = true;
      return acc;
    }, {} as Partial<Record<keyof T, boolean>>));

    return isValid;
  };

  return {
    values,
    errors,
    touched,
    setValue,
    setFieldTouched,
    validateAll,
    isValid: Object.values(errors).every(error => !error)
  };
}

// Usage example
interface UserForm {
  username: string;
  email: string;
  password: string;
}

const UserFormExample: React.FC = () => {
  const {
    values,
    errors,
    touched,
    setValue,
    setFieldTouched,
    validateAll,
    isValid
  } = useFormValidation<UserForm>(
    { username: '', email: '', password: '' },
    {
      username: (value) => {
        if (!value) return 'Username is required';
        if (value.length < 3) return 'Username must be at least 3 characters';
        return undefined;
      },
      email: (value) => {
        if (!value) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Invalid email format';
        return undefined;
      },
      password: (value) => {
        if (!value) return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters';
        return undefined;
      }
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAll()) {
      console.log('Form submitted:', values);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          value={values.username}
          onChange={(e) => setValue('username', e.target.value)}
          onBlur={() => setFieldTouched('username')}
          placeholder="Username"
        />
        {touched.username && errors.username && (
          <span style={{ color: 'red' }}>{errors.username}</span>
        )}
      </div>
      {/* Similar for email and password */}
      <button type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
};
```

## Event Delegation and Performance

### 1. Event Delegation

React automatically handles event delegation through SyntheticEvents:

```tsx
const ListWithEvents: React.FC = () => {
  const [items, setItems] = useState(["Item 1", "Item 2", "Item 3"]);

  // Single event handler for all items
  const handleItemClick = (e: React.MouseEvent<HTMLUListElement>) => {
    const target = e.target as HTMLElement;
    if (target.tagName === "LI") {
      console.log("Clicked item:", target.textContent);
    }
  };

  return (
    <ul onClick={handleItemClick}>
      {items.map((item, index) => (
        <li key={index} data-index={index}>
          {item}
        </li>
      ))}
    </ul>
  );
};
```

### 2. Preventing Default and Stopping Propagation

```tsx
const EventPropagationExample: React.FC = () => {
  const handleParentClick = () => {
    console.log("Parent clicked");
  };

  const handleChildClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents bubbling to parent
    console.log("Child clicked");
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Prevents default navigation
    console.log("Link clicked but navigation prevented");
  };

  return (
    <div onClick={handleParentClick}>
      <button onClick={handleChildClick}>Child Button</button>
      <a href="https://example.com" onClick={handleLinkClick}>
        Prevented Link
      </a>
    </div>
  );
};
```

## Dynamic Event Handlers

### 1. Parameterized Event Handlers

```tsx
const DynamicHandlers: React.FC = () => {
  const [items, setItems] = useState([
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
  ]);

  // Method 1: Using arrow functions (creates new function on each render)
  const handleDelete1 = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Method 2: Using curried functions (better performance)
  const handleDelete2 = (id: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Method 3: Using data attributes (best performance)
  const handleDelete3 = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = parseInt(e.currentTarget.dataset.id || "0");
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>
          <span>{item.name}</span>
          {/* Method 1 */}
          <button onClick={() => handleDelete1(item.id)}>Delete 1</button>
          {/* Method 2 */}
          <button onClick={handleDelete2(item.id)}>Delete 2</button>
          {/* Method 3 */}
          <button onClick={handleDelete3} data-id={item.id}>
            Delete 3
          </button>
        </div>
      ))}
    </div>
  );
};
```

## File Upload and Drag & Drop

### 1. File Upload

```tsx
const FileUpload: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(e.target.files);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFiles) {
      Array.from(selectedFiles).forEach((file) => {
        console.log("File:", file.name, "Size:", file.size);
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        accept="image/*"
      />
      <button type="submit">Upload</button>
    </form>
  );
};
```

### 2. Drag and Drop

```tsx
const DragDropArea: React.FC = () => {
  const [dragOver, setDragOver] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...droppedFiles]);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        border: `2px dashed ${dragOver ? "#007bff" : "#ccc"}`,
        padding: "20px",
        textAlign: "center",
        backgroundColor: dragOver ? "#f0f8ff" : "#f9f9f9",
      }}
    >
      <p>Drag and drop files here</p>
      {files.length > 0 && (
        <ul>
          {files.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
```

## Best Practices

1. **Use proper TypeScript types** for events
2. **Prevent memory leaks** by cleaning up event listeners
3. **Use event delegation** for better performance with many elements
4. **Debounce expensive operations** triggered by events
5. **Validate form data** both on client and server
6. **Provide immediate feedback** for user interactions
7. **Handle edge cases** like disabled states and loading states

## Next: useEffect & Side Effects

In the next lesson, we'll learn about the useEffect hook for handling side effects, API calls, and component lifecycle!
