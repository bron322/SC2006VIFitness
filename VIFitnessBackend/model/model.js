import mongoose, { Schema } from "mongoose";

const dataSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
    default: "nil",
  },
  age: { required: true, type: Number, default: 0 },
  weight: { required: true, type: Number, default: 0 },
  height: { required: true, type: Number, default: 0 },
  google_data: { type: Object, default: {} },
  strava_data: { type: Object, default: {} },
  strava_activities: { type: Object, default: {} },
  meals: { type: Array, default: [] },
  workouts: { type: Array, default: [] },
  macros_setting: {
    calorie: { type: Number, default: 2300 },
    protein: { type: Number, default: 50 },
    fat: { type: Number, default: 44 },
    carbohydrate: { type: Number, default: 250 },
  },
  clientID: { type: String, default: "" },
  clientSecret: { type: String, default: "" },
});

const User = mongoose.model("User", dataSchema);

const tokenSchema = new mongoose.Schema({
  userID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600,
  },
});

const Token = mongoose.model("Token", tokenSchema);

export { User, Token };
