import mongoose from "mongoose";

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
  meals: { type: Array, default: [] },
  workouts: { type: Array, default: [] },
  macros_setting: {
    calorie: { type: Number, default: 2300 },
    protein: { type: Number, default: 50 },
    fat: { type: Number, default: 44 },
    carbohydrate: { type: Number, default: 250 },
  },
});

const User = mongoose.model("User", dataSchema);

export { User };
