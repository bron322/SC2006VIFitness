import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3000/api",
  credentials: true,
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:5173", // Allow CORS from any origin
    "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, DELETE, OPTIONS", // Allow all HTTP methods
    "Access-Control-Allow-Headers": "*", // Allow specified headers
  },
});
