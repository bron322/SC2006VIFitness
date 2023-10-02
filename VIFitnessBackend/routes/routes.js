import express from "express";
import { User } from "../model/model.js";

const APIrouter = express.Router();

//Post Method
APIrouter.post("/post", (req, res) => {
  // console.log(req.body.username);
  // console.log(req.body.age);

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    age: req.body.age,
    weight: req.body.weight,
    height: req.body.height,
  });

  newUser
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.send(err.message);
    });
});

//create user with Google login
APIrouter.post("/post/byGoogle", (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    google_data: req.body.google_data,
  });

  newUser
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.send(err.message);
    });
});

//create user with Strava login
APIrouter.post("/post/byStrava", (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    strava_data: req.body.strava_data,
  });

  newUser
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.send(err.message);
    });
});

//Get all Method
APIrouter.get("/users", (req, res) => {
  User.find()
    .then((found) => {
      res.send(found);
    })
    .catch((err) => {
      console.log(err);
      res.send(err.message);
    });
});

//Get by ID Method
APIrouter.get("/user/:username", (req, res) => {
  User.findOne({ username: req.params.username })
    .then((found) => {
      if (found === null) {
        res.send("Null");
      } else {
        res.send(found);
      }
    })
    .catch((err) => {
      res.send("User not found");
    });
});

//Get by email Method
APIrouter.get("/user/getByEmail/:email", (req, res) => {
  User.findOne({ email: req.params.email })
    .then((found) => {
      if (found === null) {
        res.send("Null");
      } else {
        res.send(found);
      }
    })
    .catch((err) => {
      res.send("User not found");
    });
});

//Get by Gmail inside Google Data Object
APIrouter.get("/user/googledata/:gmail", (req, res) => {
  User.findOne({ "google_data.email": req.params.gmail })
    .then((found) => {
      if (found === null) {
        res.send("Null");
      } else {
        res.send(found);
      }
    })
    .catch((err) => {
      res.send("User not found");
    });
});

//Get by Strava athlete id
APIrouter.get("/user/stravadata/:stravaid", (req, res) => {
  User.findOne({ "strava_data.athlete.id": parseInt(req.params.stravaid, 10) })
    .then((found) => {
      if (found === null) {
        res.send("Null");
      } else {
        res.send(found);
      }
    })
    .catch((err) => {
      res.send("User not found");
    });
});

//Update by ID Method
APIrouter.patch("/update/:username", (req, res) => {
  User.updateOne(
    { username: req.params.username },
    {
      $set: {
        username: req.body.username,
        password: req.body.password,
      },
    }
  )
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

//Delete by ID Method
APIrouter.delete("/delete/:username", (req, res) => {
  User.deleteOne({ username: req.params.username })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err.message);
    });
});

//Add meal method
APIrouter.post("/addMeal/:username", (req, res) => {});

//Update meal method
APIrouter.patch("/updateMeal/:username", (req, res) => {});

//Delete meal method
APIrouter.delete("/deleteMeal/:username", (req, res) => {});

//Add exercise method
APIrouter.post("/addExercise/:username", (req, res) => {
  try {
    // const newExercise = req.body;
    // Find the user by username and push the new exercise to their exercise array
    User.findOneAndUpdate(
      { username: req.params.username },
      {
        $push: {
          workouts: {
            name: req.body.exerciseData.workoutName,
            time: "12am",
          },
        },
      },
      {
        new: true,
      }
    )
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.send(err);
      });
  } catch (error) {
    console.error(error);
    return res.send(error);
  }
});

//Update exercise method
APIrouter.patch("/updateExercise/:username", (req, res) => {});

//Delete exercise method
APIrouter.delete("/deleteExercise/:username/:exerciseId", async (req, res) => {
  try {
    const { username, exerciseId } = req.params;

    // Find the user by username and pull the exercise by exerciseId from their exercise array
    const updatedUser = await UserModel.findOneAndUpdate(
      { username },
      { $pull: { exercises: { _id: exerciseId } } },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User or exercise not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
  }
});

export { APIrouter };
