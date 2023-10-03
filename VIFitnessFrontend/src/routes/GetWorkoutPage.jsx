import { Form, Link } from "react-router-dom";
import { useState } from "react";
import APIDataService from "../services/APIDataService";
import axios from "axios";
import ExerciseService from "../services/ExerciseService";
import ExerciseList from "../components/ExerciseList";
import './styles/exercisebutton.css'
import userDataGenerator from "../utils/userDataGenerator.js";

//this is Lebron chatgpt page

export default function GenerateWorkout() {
  const [workoutData, setWorkoutData] = useState([]);
  const [showButton, setshowButton] = useState(false);
  const [exercisesToAddToCalendar, setExercisesToAddToCalendar] = useState([]);

  const getExercise = async (e) => {
    const bodypart = e.target.name;
    try {
      const response = await ExerciseService.queryWorkout(bodypart);
      console.log(response.data);
      setWorkoutData(response.data);
      setshowButton(true);

    } catch (error) {
      console.log(error);
    }
  }

  const addExerciseToCalendar = (exerciseName) => {
    setExercisesToAddToCalendar((prevExercises) => [
      ...prevExercises,
      {exercise : {name: exerciseName}}
  ]);
  };

  // To remove an exercise from exercisesToAddToCalendar
  const removeExerciseFromCalendar = (exerciseName) => {
    setExercisesToAddToCalendar((prevExercises) => {
      const updatedExercises = { ...prevExercises };
      delete updatedExercises[exerciseName];
      return updatedExercises;
    });
  };

  const handleCheckboxChange = (event, exercise) => {
    console.log(event.target.checked)
    // Update the list of exercisesToAddToCalendar based on the checkbox status
    if (event.target.checked) {
      // Add the exercise name to the list when checked
      addExerciseToCalendar(exercise);
      console.log(exercisesToAddToCalendar);
    } else {
      // Remove the exercise name from the list when unchecked
      removeExerciseFromCalendar(exercise);
    }
  };

  const handleAddToCalendar = async () => {
    try {
      // Check if there are exercises to add
      if (exercisesToAddToCalendar.length === 0) {
        alert('No exercises selected to add to calendar.');
        return;
      }

      const exerciseDataToAdd = {
        username: 'bron322', // Replace with the actual username
        exerciseData: 
          exercisesToAddToCalendar // Pass the list of exercise names to the server
        ,
      };

      // Call the addingExercise function to add the exercise
      const updatedUserData = await APIDataService.addingExercise(exerciseDataToAdd);

      // Handle the response as needed
      alert(`Added to calendar!`);

      // You can also update your component's state or perform any other actions based on the response data
      console.log('Updated user data:', updatedUserData);
    } catch (error) {
      console.error('Error adding exercise:', error);
      // Handle errors here
    }
  };

  const test = (event) => {
    console.log(event)
  }

  return (
    <div className="container">
      <div>
        <h1 className="heading">Exercise Generator</h1>
        {workoutData.map((item, index) => {
          return (
              <ExerciseList
                onChange={() => handleCheckboxChange(event, item.name)} // Pass item.name as an argument
                key={item.instructions}
                name={item.name}
                difficulty={item.difficulty}
              />
          );
        })}

        {showButton ?
          <button onClick={handleAddToCalendar} className="addToCalendarButton">
            Add to Calendar
          </button> : null
        }

        <button id="btn-biceps" name='biceps' onClick={getExercise}>
          Generate an arm exercise for biceps
        </button>

        <button id="btn-chest" name='chest' onClick={getExercise}>
          Generate an arm exercise for chest
        </button>
      </div>
    </div>
  );
}