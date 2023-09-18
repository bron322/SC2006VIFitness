import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
  },
  age: {
    required: true,
    type: Number,
  },
  password: String
});

const User = mongoose.model("User", dataSchema);

export { User };
