import express from "express";
import { User } from "../model/model.js";
import crypto from "crypto";

const authRouter = express.Router();

//POST initialise tokens for devs, find by email
// body have to look like
// {
//   email: String
// }
authRouter.post("/initialiseToken", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.send("Null");
  } else {
    const clientSecret = crypto.randomBytes(32).toString("hex");
    const clientID = user._id.toString();

    const newUser = await User.findOneAndUpdate(
      { email: req.body.email },
      {
        clientID: clientID,
        clientSecret: clientSecret,
      },
      { returnOriginal: false }
    );

    res.send(newUser);
  }
});

// All routes here will check for Headers
// header will look like
// {
//   clientID: String,
//   clientSecret: String
// }

//get user workouts
authRouter.get("/v1/getUserWorkouts", async (req, res) => {
  const user = await User.findOne({ clientID: req.headers.clientid });
  if (!user) {
    res.status(401).json({ code: 401, message: "Unauthorised" });
  } else if (user.clientSecret !== req.headers.clientsecret) {
    res.status(401).json({ code: 401, message: "Unauthorised" });
  } else {
    res.status(200).json(user.workouts);
  }
});

//get user meals
authRouter.get("/v1/getUserMeals", async (req, res) => {
  const user = await User.findOne({ clientID: req.headers.clientid });
  if (!user) {
    res.status(401).json({ code: 401, message: "Unauthorised" });
  } else if (user.clientSecret !== req.headers.clientsecret) {
    res.status(401).json({ code: 401, message: "Unauthorised" });
  } else {
    res.status(200).json(user.meals);
  }
});

//get user strava activities
authRouter.get("/v1/getUserStravaActivities", async (req, res) => {
  const user = await User.findOne({ clientID: req.headers.clientid });
  if (!user) {
    res.status(401).json({ code: 401, message: "Unauthorised" });
  } else if (user.clientSecret !== req.headers.clientsecret) {
    res.status(401).json({ code: 401, message: "Unauthorised" });
  } else {
    res.status(200).json(user.strava_activities);
  }
});

//get user info
authRouter.get("/v1/getUserInfo", async (req, res) => {
  const user = await User.findOne({ clientID: req.headers.clientid });
  if (!user) {
    res.status(401).json({ code: 401, message: "Unauthorised" });
  } else if (user.clientSecret !== req.headers.clientsecret) {
    res.status(401).json({ code: 401, message: "Unauthorised" });
  } else {
    res.status(200).json({
      username: user.username,
      email: user.email,
      age: user.age,
      weight: user.weight,
      height: user.height,
    });
  }
});

//post add meal
authRouter.get("/v1/addMeal", async (req, res) => {
  const user = await User.findOne({ clientID: req.headers.clientid });
  if (!user) {
    res.status(401).json({ code: 401, message: "Unauthorised" });
  } else if (user.clientSecret !== req.headers.clientsecret) {
    res.status(401).json({ code: 401, message: "Unauthorised" });
  } else if (
    !req.body.hasOwnProperty("foodName") ||
    !req.body.hasOwnProperty("calorie") ||
    !req.body.hasOwnProperty("protein") ||
    !req.body.hasOwnProperty("carbohydrate") ||
    !req.body.hasOwnProperty("fat") ||
    !req.body.hasOwnProperty("mealType")
  ) {
    res.status(400).json({ code: 400, message: "Bad Request" });
  } else if (
    req.body.mealType !== "breakfast" &&
    req.body.mealType !== "lunch" &&
    req.body.mealType !== "dinner"
  ) {
    res.status(400).json({ code: 400, message: "Bad Request2" });
  } else {
    const mealData = {
      foodName: req.body.foodName,
      calorie: req.body.calorie,
      protein: req.body.protein,
      carbohydrate: req.body.carbohydrate,
      fat: req.body.fat,
      mealType: req.body.mealType,
      createdAt: new Date(),
    };

    User.findOneAndUpdate(
      { clientID: req.headers.clientid },
      {
        $push: {
          meals: mealData,
        },
      }
    )
      .then((result) => {
        res.status(200).json({
          code: 200,
          message: "Meal added",
        });
      })
      .catch((err) => {
        res.status(500).json({
          code: 500,
          message: "Internal server error",
        });
      });
  }
});

//post add exercise

export { authRouter };
