# Exercise 3: State Management with useState Hook

## Instructions

Create the following components that demonstrate state management using the useState hook. Each component should be properly typed with TypeScript and show different state patterns.

## Exercise 3.1: Interactive Counter

Create a component called `InteractiveCounter` that:

- Has a count state starting at 0
- Increment button (+1)
- Decrement button (-1)
- Reset button (back to 0)
- Step size input (allows changing increment/decrement amount)
- Display current count with nice styling

**Requirements:**

- Use useState for count and step size
- Handle edge cases (negative numbers, etc.)
- TypeScript for all state
- Visual feedback for button clicks

## Exercise 3.2: User Registration Form

Create a component called `UserRegistrationForm` that manages:

- `firstName` (string)
- `lastName` (string)
- `email` (string)
- `password` (string)
- `confirmPassword` (string)
- `age` (number)
- `agreeToTerms` (boolean)

**Requirements:**

- All form fields controlled by state
- Real-time validation display
- Show form data summary
- Submit button enabled only when valid
- Clear form functionality
- TypeScript interfaces for form data

## Exercise 3.3: Dynamic Todo List

Create a component called `DynamicTodoList` that manages:

- Array of todo items
- Each todo has: id, text, completed, priority ('low' | 'medium' | 'high')
- Input for new todos
- Priority selector
- Filter by completion status
- Filter by priority

**Requirements:**

- Add new todos with auto-generated IDs
- Toggle todo completion
- Delete todos
- Edit todo text inline
- Filter functionality
- Count of completed/total todos
- TypeScript for all todo operations

## Exercise 3.4: Shopping Cart

Create a component called `ShoppingCart` that manages:

- Array of cart items
- Each item has: id, name, price, quantity, category
- Add items to cart
- Update quantities
- Remove items
- Calculate totals

**Requirements:**

- Add predefined products to cart
- Increase/decrease quantity buttons
- Remove item functionality
- Calculate subtotal, tax (8%), and total
- Display item count in cart
- Clear entire cart option
- TypeScript for cart operations

## Exercise 3.5: Color Theme Switcher

Create a component called `ThemeSwitcher` that manages:

- Current theme state ('light' | 'dark' | 'blue' | 'green')
- Custom color values for each theme
- Apply theme to entire component tree

**Requirements:**

- Theme selection buttons/dropdown
- Preview of theme colors
- Apply theme styling to sample content
- Save theme preference (use state only for now)
- Smooth transitions between themes
- TypeScript for theme types

## Exercise 3.6: Multi-Step Form Wizard

Create a component called `FormWizard` that manages:

- Current step (1, 2, 3, 4)
- Form data across all steps
- Step 1: Personal Info (name, email, phone)
- Step 2: Address (street, city, zipcode, country)
- Step 3: Preferences (newsletter, notifications, theme)
- Step 4: Review and submit

**Requirements:**

- Next/Previous navigation
- Progress indicator
- Validation for each step
- Review step shows all data
- Can't proceed if current step invalid
- Final submission shows all collected data
- TypeScript for all form data

## Exercise 3.7: Real-time Search and Filter

Create a component called `ProductSearch` that manages:

- Search query state
- Selected category filter
- Price range filter (min, max)
- Sort option ('name' | 'price' | 'rating')
- Mock product data

**Requirements:**

- Real-time search as you type
- Category dropdown filter
- Price range sliders
- Sort dropdown
- Display filtered and sorted results
- Show result count
- Clear all filters button
- TypeScript for all filter states

## Exercise 3.8: Interactive Dashboard

Create a component called `UserDashboard` that manages:

- User profile state (name, avatar, bio)
- Notification state (array of notifications)
- Settings state (email preferences, privacy settings)
- Activity log state

**Requirements:**

- Editable profile section
- Add/remove/mark notifications as read
- Toggle various settings
- Add activity log entries
- Statistics (total notifications, settings enabled, etc.)
- Export data functionality (display as JSON)
- TypeScript throughout

## File Structure

Create your exercise files in the `src/learning/exercises/` folder:

- `InteractiveCounter.tsx`
- `UserRegistrationForm.tsx`
- `DynamicTodoList.tsx`
- `ShoppingCart.tsx`
- `ThemeSwitcher.tsx`
- `FormWizard.tsx`
- `ProductSearch.tsx`
- `UserDashboard.tsx`
- `StateExercisesDashboard.tsx` (main component)

## Testing Your Components

Create a `StateExercisesDashboard` component that:

- Imports all your exercise components
- Uses tabs or navigation to switch between exercises
- Provides a clean interface to test each component
- Shows component names and descriptions

## Bonus Challenge

Create a `StateManagementShowcase` component that:

- Demonstrates state lifting (child components sharing state)
- Shows parent-child communication with state
- Implements a complex state management scenario
- Uses multiple useState hooks effectively
- Includes state persistence simulation

## Advanced Bonus

Create a `TaskManager` application that combines multiple state patterns:

- Project management (create, edit, delete projects)
- Task management within projects
- User assignments
- Priority and status tracking
- Search and filtering
- Statistics and reporting
- All with proper TypeScript

---

**Key Learning Objectives:**

- Master useState hook patterns
- Handle complex state objects and arrays
- Implement form state management
- Create interactive user interfaces
- Use TypeScript with React state
- Understand state update patterns
- Practice functional state updates

**Tips:**

- Always use functional updates when state depends on previous state
- Don't mutate state directly - use spread operators
- Keep state as simple as possible
- Use multiple useState hooks instead of one complex object
- Think about state structure before implementing
- Test edge cases and error scenarios

**Remember:**

- `useState` returns `[currentState, setStateFunction]`
- State updates are asynchronous
- Functional updates: `setState(prev => prev + 1)`
- Object updates: `setState(prev => ({...prev, newProp: value}))`
- Array updates: `setState(prev => [...prev, newItem])`
