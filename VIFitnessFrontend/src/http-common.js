import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:3000/api",
  baseURL: "https://expensive-eel-wrap.cyclic.app/api",
  credentials: true,
  headers: {
    "Content-type": "application/json",
  },
});

const AuthAPIhttp = axios.create({
  // baseURL: "http://localhost:3000/vifitness",
  baseURL: "https://expensive-eel-wrap.cyclic.app/vifitness",
  credentials: true,
  headers: {
    "Content-type": "application/json",
  },
});

const appID = import.meta.env.VITE_NUTRITIONIX_ID;
const appKey = import.meta.env.VITE_NUTRITIONIX_KEY;

const Nutrionixhttp = axios.create({
  baseURL: "https://trackapi.nutritionix.com/",
  headers: {
    "x-app-id": appID,
    "x-app-key": appKey,
    "x-remote-user-id": 0,
  },
});

const exerciseKey = import.meta.env.VITE_EXERCISE_KEY;

const ExerciseAPIhttp = axios.create({
  url: "https://api.api-ninjas.com/v1/",
  headers: {
    "X-Api-Key": exerciseKey,
  },
});

const StravaAPIhttp = axios.create({
  baseURL: "https://www.strava.com/api/v3/",
});

const brevoKey = import.meta.env.VITE_BREVO_KEY;

const BrevoAPIhttp = axios.create({
  baseURL: "https://api.brevo.com/v3/",
  headers: {
    accept: "application/json",
    "api-key": brevoKey,
    "content-type": "application/json",
  },
});

export {
  Nutrionixhttp,
  ExerciseAPIhttp,
  StravaAPIhttp,
  BrevoAPIhttp,
  AuthAPIhttp,
};
