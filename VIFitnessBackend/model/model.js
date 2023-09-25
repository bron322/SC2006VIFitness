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
  age: { required: true, type: Number, default: 0 },
  weight: { required: true, type: Number, default: 0 },
  height: { required: true, type: Number, default: 0 },
  google_data: { type: Object, default: {} },
  strava_data: { type: Object, default: {} },
  meals: { type: Array, default: [] },
  workouts: { type: Array, default: [] },
});

const User = mongoose.model("User", dataSchema);

export { User };
