import { v4 as uuidv4 } from "uuid";

const getRandomUID = () => {
  return uuidv4();
};

export default {
  getRandomUID,
};
