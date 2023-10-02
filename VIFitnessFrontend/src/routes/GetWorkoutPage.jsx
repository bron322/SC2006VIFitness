import { Form, Link } from "react-router-dom";
import { useState } from "react";
import APIDataService from "../services/APIDataService";
import axios from "axios";
import ExerciseService from "../services/ExerciseService";
import ExerciseList from "../components/ExerciseList";
import './styles/exercisebutton.css'

//this is Lebron chatgpt page

export default function GenerateWorkout() {
  const [workoutData, setWorkoutData] = useState([]);
  const [showButton, setshowButton] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
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

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);

    // Update the list of exercisesToAddToCalendar based on the checkbox status
    if (!isChecked) {
      // Add the exercise name to the list when checked
      setExercisesToAddToCalendar([...exercisesToAddToCalendar, props.name]);
    } else {
      // Remove the exercise name from the list when unchecked
      setExercisesToAddToCalendar(
        exercisesToAddToCalendar.filter((exercise) => exercise !== props.name)
      );
    }
  };

  const handleAddToCalendar = async () => {
    try {
      // Access the updated value of exercisesToAddToCalendar from the state
      const updatedExercisesToAddToCalendar = isChecked
      ? [...exercisesToAddToCalendar, props.name]
      : exercisesToAddToCalendar.filter((exercise) => exercise !== props.name);

      // Check if there are exercises to add
      if (updatedExercisesToAddToCalendar.length === 0) {
        alert('No exercises selected to add to calendar.');
        return;
      }

      const exerciseDataToAdd = {
        username: 'bron322', // Replace with the actual username
        exerciseData: {
          exercises: updatedExercisesToAddToCalendar, // Pass the list of exercise names to the server
        },
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

  return (
    <div className="container">
      <div>
        <h1 className="heading">Exercise Generator</h1>
        {workoutData.map((item, index) => {
          return (
            <>
              <ExerciseList
                checked={isChecked}
                onChange={handleCheckboxChange}
                key={index}
                name={item.name}
                difficulty={item.difficulty}
              />
            </>
          );
        })}

        {showButton ? 
        <button onClick={handleAddToCalendar} className="addToCalendarButton">
          Add to Calendar
        </button> : null
        }

        <button id="btn" name='biceps' onClick={getExercise}>
          Generate an arm exercise for biceps
        </button>

        <button id="btn" name='chest' onClick={getExercise}>
          Generate an arm exercise for chest
        </button>
      </div>
    </div>
  );
}