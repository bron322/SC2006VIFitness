import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3000/api",
  credentials: true,
  headers: {
    "Content-type": "application/json",
  },
});

const appID = import.meta.env.VITE_NUTRITIONIX_ID;
const appKey = import.meta.env.VITE_NUTRITIONIX_KEY;
const exerciseKey = import.meta.env.VITE_EXERCISE_KEY;

const Nutrionixhttp = axios.create({
  baseURL: "https://trackapi.nutritionix.com/",
  headers: {
    "x-app-id": appID,
    "x-app-key": appKey,
    "x-remote-user-id": 0,
  },
});

const ExerciseAPIhttp = axios.create({
  url: 'https://api.api-ninjas.com/v1/',
  headers: {
    'X-Api-Key': exerciseKey,
  },
})

export { Nutrionixhttp , ExerciseAPIhttp };
