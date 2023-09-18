import express from "express";
import mongoose, { mongo } from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import { APIrouter } from "./routes/routes.js";
import { User } from "./model/model.js";

///////////////////////////////////////////////// app set-up //////////////////////////////////////////////////
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));
app.use("/api", APIrouter);

///////////////////////////////////////////////// cors set-up //////////////////////////////////////////////////
var corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionsSuccessStatus: 200,
  headers: {
    "Access-Control-Allow-Origin": "http://localhost:5173", // Allow CORS from any origin
    "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, DELETE, OPTIONS", // Allow all HTTP methods
    "Access-Control-Allow-Headers": "*", // Allow specified headers
  },
};

//////////////////////////////////////////////////  mongoDB ///////////////////////////////////////////////////
const mongoURLString = process.env.DATABASE_URL;
mongoose.connect(mongoURLString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

///////////////////////////////////////////////  port /////////////////////////////////////////////////////////
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function () {
  console.log(`Server is running on ${port}`);
});
