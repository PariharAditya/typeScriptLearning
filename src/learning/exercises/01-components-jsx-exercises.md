# Exercise 1: Components & JSX Practice

## Instructions

Create the following components in separate files. Each component should be properly typed with TypeScript.

## Exercise 1.1: Personal Profile Component

Create a component called `PersonalProfile` that displays:

- Your name
- Your age
- Your favorite programming language
- Current date and time

**Requirements:**

- Use TypeScript
- Display the information in a nicely formatted way
- Use JSX expressions to embed variables

## Exercise 1.2: Weather Status Component

Create a component called `WeatherStatus` that:

- Shows different messages based on temperature
- If temp > 25: "It's hot outside! 🌞"
- If temp 15-25: "Perfect weather! 🌤️"
- If temp < 15: "It's cold outside! 🥶"
- Use a hardcoded temperature value for now

**Requirements:**

- Use conditional rendering
- Include appropriate emojis
- Use TypeScript

## Exercise 1.3: Shopping List Component

Create a component called `ShoppingList` that:

- Displays a list of grocery items
- Each item should be displayed in a list format
- Add a header "My Shopping List"
- Use an array of at least 5 items

**Requirements:**

- Use array mapping
- Proper key props for list items
- TypeScript types

## Exercise 1.4: Student Grade Component

Create a component called `StudentGrade` that:

- Displays student name
- Shows their grade (A, B, C, D, F)
- Shows different colors or messages based on grade:
  - A: "Excellent! 🎉" (green)
  - B: "Good job! 👍" (blue)
  - C: "Average 📚" (yellow)
  - D: "Needs improvement 📖" (orange)
  - F: "Failed ❌" (red)

**Requirements:**

- Use conditional rendering
- Apply inline styles or CSS classes
- TypeScript

## Exercise 1.5: Math Calculator Display

Create a component called `MathDisplay` that:

- Shows two numbers
- Displays the result of addition, subtraction, multiplication, and division
- Format the output nicely

**Requirements:**

- Use JavaScript expressions in JSX
- Handle division by zero case
- TypeScript

## File Structure

Create your exercise files in the `src/learning/exercises/` folder:

- `PersonalProfile.tsx`
- `WeatherStatus.tsx`
- `ShoppingList.tsx`
- `StudentGrade.tsx`
- `MathDisplay.tsx`

## Testing Your Components

You can test your components by importing them into `App.tsx` and rendering them.

## Bonus Challenge

Create a component called `Dashboard` that renders ALL the above components in a nice layout. Use CSS to make it look professional.

---

**Tips:**

- Remember to export your components as default
- Use proper TypeScript return types
- Don't forget to import React
- Use meaningful variable names
- Test your components by rendering them
