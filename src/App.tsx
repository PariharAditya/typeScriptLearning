import React from "react";
import StateExercisesDashboard from "./learning/solutions/StateExercisesDashboard";
// Your previous work - uncomment to see your implementations
// import { PersonalInfoCard } from "./learning/exercises/pesonalInfo";
// import { WeatherCard } from "./learning/exercises/weatherExample";
// import { list as ShoppingList } from "./learning/exercises/shoppinglist";
// import { StudentGrade } from "./learning/exercises/studentGrade";
// import MathDisplay from "./learning/solutions/MathDisplay";
// import { UserProfile } from "./learning/exercises/UserProfileCard";

function App() {
  return (
    <div className="App">
      {/* Lesson 3: State Management with useState */}
      <StateExercisesDashboard />

      {/* Your previous implementations from Lesson 1 & 2 */}
      {/* Uncomment below to see your work */}
      {/*
      <div style={{ backgroundColor: "#1e2124", minHeight: "100vh" }}>
        <PersonalInfoCard
          name="John Doe"
          age={30}
          email="john@example.com"
          currentDate={new Date().toLocaleString()}
        />
        
        <WeatherCard
          city="New York"
          temperature={0}
          condition={0 < 10 ? "Cold" : "Warm"}
          date={new Date().toLocaleString()}
        />

        <ShoppingList items={["Apples", "Bananas", "Oranges"]} />
        <StudentGrade name="random" grade={Math.floor(Math.random() * 5)} />
        <MathDisplay />

        <UserProfile
          name="Jane Doe"
          age={28}
          email="jane@example.com"
          profilePictureUrl="https://via.placeholder.com/150"
          isOnline={true}
        />
      </div>
      */}
    </div>
  );
}

export default App;
