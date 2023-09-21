import { Form, Link } from "react-router-dom";
import { useState} from "react";
import APIDataService from "../services/APIDataService";
import axios from "axios";
import ExerciseService from "../services/ExerciseService";

//this is Lebron chatgpt page

export default function GenerateWorkout() {
  const [arm, setArm] = useState('');

  const apiKey = 'GsXydd2Sca+Q3nAN8iW7wg==5ggRjOcaIH5ls6qB';

  const options = {
    method: 'GET',
    headers: {
      'X-Api-Key': apiKey,
    },
  };

  const apiURL = "https://api.api-ninjas.com/v1/exercises?muscle=biceps";

  const getExercise = async () => {
    try {
      const response = await fetch(apiURL, options);
      const data = await response.json();

      setArm(data[0].name);
    } catch (error) {
      setArm('An error happened, try again later');
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div>
        <h1 className="heading">Exercise Generator</h1>
        <p id="arm">
          {arm}
        </p>
        <button id="btn" onClick={getExercise}>
          Generate an arm exercise for biceps
        </button>
      </div>
    </div>
  );
}