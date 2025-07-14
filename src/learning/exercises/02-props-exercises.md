# Exercise 2: Props & Component Communication

## Instructions

Create the following components that demonstrate props usage. Each component should be properly typed with TypeScript interfaces.

## Exercise 2.1: User Profile Card

Create a component called `UserProfileCard` that accepts props for:

- `name` (string)
- `age` (number)
- `email` (string)
- `profilePicture` (string - URL)
- `isOnline` (boolean)

**Requirements:**

- Display the profile picture (use any placeholder image URL)
- Show online/offline status with different colors
- Create a parent component that renders 3 different user cards
- Use proper TypeScript interfaces

## Exercise 2.2: Product Card

Create a component called `ProductCard` that accepts:

- `name` (string)
- `price` (number)
- `description` (string)
- `category` (string)
- `inStock` (boolean)
- `rating` (number, 1-5)

**Requirements:**

- Display price with currency symbol
- Show stock status (In Stock/Out of Stock)
- Display rating as stars (★★★★☆)
- Different styling for in-stock vs out-of-stock items
- Create a parent component that displays a product catalog

## Exercise 2.3: Interactive Button Component

Create a component called `CustomButton` that accepts:

- `text` (string)
- `onClick` (function)
- `variant` ('primary' | 'secondary' | 'danger')
- `size` ('small' | 'medium' | 'large')
- `disabled` (boolean, optional)

**Requirements:**

- Different colors for each variant
- Different sizes
- Handle disabled state
- Call the onClick function when clicked
- Create a parent component that demonstrates all variants

## Exercise 2.4: Todo Item Component

Create a component called `TodoItem` that accepts:

- `id` (number)
- `text` (string)
- `completed` (boolean)
- `onToggle` (function that takes id as parameter)
- `onDelete` (function that takes id as parameter)

**Requirements:**

- Strike through completed todos
- Toggle button to mark as complete/incomplete
- Delete button to remove todo
- Different styling for completed vs incomplete
- Create a parent component that manages a list of todos

## Exercise 2.5: Card Container with Children

Create a component called `Card` that accepts:

- `title` (string)
- `subtitle` (string, optional)
- `children` (React.ReactNode)
- `backgroundColor` (string, optional)

**Requirements:**

- Render any content passed as children
- Nice card styling with border and shadow
- Optional subtitle that only shows if provided
- Customizable background color
- Create examples showing different content in cards

## Exercise 2.6: Weather Widget

Create a component called `WeatherWidget` that accepts:

- `city` (string)
- `temperature` (number)
- `condition` ('sunny' | 'rainy' | 'cloudy' | 'snowy')
- `humidity` (number)
- `windSpeed` (number)

**Requirements:**

- Display appropriate weather icon/emoji for each condition
- Show temperature in Celsius and Fahrenheit
- Format all data nicely
- Create a parent component showing weather for multiple cities

## Exercise 2.7: Student Report Card

Create a component called `StudentReportCard` that accepts:

- `student` (object with name, id, class)
- `subjects` (array of objects with subject, grade, teacher)
- `overallGrade` (string)
- `onPrint` (function)

**Requirements:**

- Display student information
- Show all subjects with grades
- Calculate and display GPA
- Print button that calls onPrint function
- Nice table format for subjects

## File Structure

Create your exercise files in the `src/learning/exercises/` folder:

- `UserProfileCard.tsx` + `UserProfileGallery.tsx` (parent)
- `ProductCard.tsx` + `ProductCatalog.tsx` (parent)
- `CustomButton.tsx` + `ButtonShowcase.tsx` (parent)
- `TodoItem.tsx` + `TodoList.tsx` (parent)
- `Card.tsx` + `CardExamples.tsx` (parent)
- `WeatherWidget.tsx` + `WeatherDashboard.tsx` (parent)
- `StudentReportCard.tsx` + `ClassReports.tsx` (parent)

## Testing Your Components

Create a main component that imports and displays all your exercises to test them.

## Bonus Challenge

Create a `Dashboard` component that:

- Uses the `Card` component to wrap each exercise
- Implements a navigation system to switch between exercises
- Passes different props to see various states of your components
- Uses proper TypeScript throughout

---

**Tips:**

- Define interfaces for all props
- Use default parameters where appropriate
- Test with different prop combinations
- Make sure your components handle edge cases
- Use meaningful prop names
- Keep components focused and reusable
