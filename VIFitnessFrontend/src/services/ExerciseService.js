import { ExerciseAPIhttp } from "../http-common";

const queryWorkout = async () => {
    return ExerciseAPIhttp.get('exercises?muscle=biceps');
}

const ExerciseService = {
    queryWorkout,
}
  
export default ExerciseService;