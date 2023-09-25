import { ExerciseAPIhttp } from "../http-common";

const queryWorkout = async (bodypart) => {
    return ExerciseAPIhttp.get(`https://api.api-ninjas.com/v1/exercises?muscle=${bodypart}`);
}

const ExerciseService = {
    queryWorkout,
}
  
export default ExerciseService;