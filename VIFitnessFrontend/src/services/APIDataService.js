import http from "../http-common.js";

// GET all users
const getAll = async () => {
  return http.get("/users");
};

//GET user by username
const get = async (username) => {
  return http.get(`/user/${username}`);
};

//POST user by username and password
const create = async (data) => {
  return http.post(`/post`, data);
}

const APIDataService = {
  getAll,
  get,
  create
};

export default APIDataService;
