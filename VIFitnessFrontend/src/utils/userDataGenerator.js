import { v4 as uuidv4 } from "uuid";

const getRandomPassword = () => {
  return Math.random().toString(36).slice(2, 10);
};

const getRandomUsername = () => {
  return uuidv4();
};

export default {
  getRandomPassword,
  getRandomUsername,
};
