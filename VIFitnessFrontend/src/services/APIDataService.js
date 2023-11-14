import http from "../http-common.js";

// GET all users
const getAll = async () => {
  return http.get("/users");
};

//GET user by username
const get = async (username) => {
  return http.get(`/user/${username}`);
};

//GET user by email
const getByEmail = async (email) => {
  return http.get(`/user/getByEmail/${email}`);
};

//GET user by gmail in google_data
const getByGmail = async (gmail) => {
  return http.get(`/user/googledata/${gmail}`);
};

//GET user by Strava athlete id
const getByStravaID = async (id) => {
  return http.get(`/user/stravadata/${id}`);
};

//POST user by username and password
const create = async (data) => {
  return http.post(`/post`, data);
};

//POST user by register with google
const createByGoogle = async (data) => {
  return http.post("/post/byGoogle", data);
};

//POST connect to google with existing
const connectToGoogle = async (data) => {
  return http.post(`connectGoogle/${data.email}`, data);
};

//POST user by register with Strava
const createByStrava = async (data) => {
  return http.post("/post/byStrava", data);
};

//POST connect to strava with existing
const connectToStrava = async (data) => {
  return http.post(`connectStrava/${data.email}`, data);
};

//POST user by ticking the exercises
const addingExercise = async (data) => {
  return http.post(`/addExercise/${data.username}`, data);
};

//POST delete exercise by user email
const deleteExercise = async (data) => {
  return http.post(`/deleteExercise/${data.email}`, data);
};

//PATCH exercise isCompleted
const updateExercise = async (data) => {
  return http.patch(`/updateExercise/${data.username}`, data);
};

//PATCH exercise description
const editExercise = async (data) => {
  return http.patch(`/editExercise/${data.username}`, data);
};

//PATCH limits settings
const updateLimits = async (data) => {
  return http.patch(`/updateLimits/${data.email}`, data);
};

//POST add meal by user email
const addMeal = async (data) => {
  return http.post(`/addMeal/${data.email}`, data);
};

//POST delete meal by user email
const deleteMeal = async (data) => {
  return http.post(`/deleteMeal/${data.email}`, data);
};

//PATCH update user settings by user email
const updateUserSetting = async (data) => {
  return http.patch(`/updateUserSettings/${data.email}`, data);
};

//PATCH update user settings by user email
const updateUserPassword = async (data) => {
  return http.patch(`/updateUserPassword/${data.email}`, data);
};

//POST update strava activities to database by user email
const updateStravaActivities = async (data) => {
  return http.post(`/updateStravaActivities/${data.email}`, data);
};

//GET token
const getToken = async (data) => {
  return http.get(`getToken/${data}`);
};

//POST reset password
const resetPassword = async (data) => {
  return http.post(`resetPassword/${data.id}`, data);
};

//GET reset password start
const resetPasswordStart = async (data) => {
  return http.get(`resetUserPassword/${data}`);
};

//Upload Profile pic
const uploadProfilePic = async (data) => {
  return http.patch(`uploadProfilePic/${data.username}`, data);
};

//PATCH refresh Strava token
const refreshStrava = async (data) => {
  return http.patch(`refreshStrava/${data.email}`, data);
};

const APIDataService = {
  getAll,
  get,
  getByEmail,
  getByGmail,
  getByStravaID,
  create,
  createByGoogle,
  connectToGoogle,
  createByStrava,
  connectToStrava,
  addingExercise,
  deleteExercise,
  updateExercise,
  editExercise,
  updateLimits,
  addMeal,
  deleteMeal,
  updateUserSetting,
  updateUserPassword,
  updateStravaActivities,
  getToken,
  resetPassword,
  resetPasswordStart,
  uploadProfilePic,
  refreshStrava,
};

export default APIDataService;
