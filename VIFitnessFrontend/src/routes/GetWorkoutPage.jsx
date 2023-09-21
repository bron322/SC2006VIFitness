import { Form, Link } from "react-router-dom";
import { useState} from "react";
import APIDataService from "../services/APIDataService";
import axios from "axios";
import ExerciseService from "../services/ExerciseService";
import ExerciseList from "../components/ExerciseList";

//this is Lebron chatgpt page

export default function GenerateWorkout() {
  const [workoutData, setWorkoutData] = useState([]);

  const getExercise = async (e) => {
    const bodypart = e.target.name;
    try {
      const response = await ExerciseService.queryWorkout(bodypart);
      console.log(response.data);
      setWorkoutData(response.data);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      <div>
        <h1 className="heading">Exercise Generator</h1>
        {workoutData.map((item, index) => {
        return (
          <ExerciseList
            key={index}
            name={item.name}
            instructions={item.instructions}
          />
        );
        })}
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