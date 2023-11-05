import { Nutrionixhttp } from "../http-common";

// this is a post method
const getNutrients = async (data) => {
  return Nutrionixhttp.post("/v2/natural/nutrients", data);
};

//this is a post method for exercises
const getExercise = async (data) => {
  return Nutrionixhttp.post("/v2/natural/exercise", data);
};

const NutritionixService = {
  getNutrients,
  getExercise,
};

export default NutritionixService;
