import { Nutrionixhttp } from "../http-common";

// this is a post method
const getNutrients = async (data) => {
  return Nutrionixhttp.post("/v2/natural/nutrients", data);
};

const NutritionixService = {
  getNutrients,
};

export default NutritionixService;
