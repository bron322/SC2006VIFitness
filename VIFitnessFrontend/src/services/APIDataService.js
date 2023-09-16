import http from "../http-common.js";

// GET all users
const getAll = async () => {
  return http.get("/users");
};

//GET user by username
const get = async (username) => {
  return http.get(`/user/${username}`);
};

const APIDataService = {
  getAll,
  get,
};

export default APIDataService;
