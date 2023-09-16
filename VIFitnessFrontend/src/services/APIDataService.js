import http from "../http-common.js";

class APIDataService {
  // GET all users
  getAll() {
    return http.get("/users");
  }

  //GET user by username
  get(username) {
    return http.get(`/user/${username}`);
  }
}
