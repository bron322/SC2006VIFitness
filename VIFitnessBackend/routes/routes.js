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

//Add Google data to user by email
APIrouter.post("/connectGoogle/:email", (req, res) => {
  const googleData = req.body.googleData;

  User.findOneAndUpdate(
    { email: req.params.email },
    {
      $set: {
        google_data: googleData,
      },
    },
    { returnOriginal: false }
  )
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
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

//Add Strava data to user by email
APIrouter.post("/connectStrava/:email", (req, res) => {
  const stravaData = req.body.token;

  User.findOneAndUpdate(
    { email: req.params.email },
    {
      $set: {
        strava_data: stravaData,
      },
    },
    { returnOriginal: false }
  )
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err.message);
    });
});

//update Strava activities by email
APIrouter.post("/updateStravaActivities/:email", (req, res) => {
  const data = req.body.activities;

  User.findOneAndUpdate(
    { email: req.params.email },
    {
      $addToSet: {
        strava_activities: { $each: data },
      },
    },
    { returnOriginal: false }
  )
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
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

//Update macros-limit method
APIrouter.patch("/updateLimits/:email", (req, res) => {
  const limitsData = req.body.newLimits;

  User.findOneAndUpdate(
    { email: req.params.email },
    {
      $set: {
        macros_setting: limitsData,
      },
    },
    { returnOriginal: false }
  )
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err.message);
    });
});

//Add meal method
APIrouter.post("/addMeal/:email", (req, res) => {
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
    { email: req.params.email },
    {
      $push: {
        meals: mealData,
      },
    },
    {
      returnOriginal: false,
    }
  )
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

//Update meal method
APIrouter.patch("/updateMeal/:username", (req, res) => {});

//Delete meal method
APIrouter.post("/deleteMeal/:email", (req, res) => {
  User.findOneAndUpdate(
    { email: req.params.email },
    {
      $pull: {
        meals: {
          createdAt: new Date(req.body.createdAt),
        },
      },
    },
    {
      returnOriginal: false,
    }
  )
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

//Add exercise method
APIrouter.post("/addExercise/:username", (req, res) => {
  const exerciseData = req.body.exerciseData;

  User.findOneAndUpdate(
    { username: req.params.username },
    {
      $push: {
        workouts: { $each: exerciseData },
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
});

//Update exercise method
APIrouter.patch("/updateExercise/:username", (req, res) => {});

//Delete exercise method
APIrouter.post("/deleteExercise/:email", (req, res) => {
  User.findOneAndUpdate(
    { email: req.params.email },
    {
      $pull: {
        workouts: {
          name: req.body.name,
        },
      },
    },
    {
      returnOriginal: false,
    }
  )
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

//PATCH update user settings by email
APIrouter.patch("/updateUserSettings/:email", (req, res) => {
  const data = req.body.newSettings;

  User.findOneAndUpdate(
    { email: req.params.email },
    {
      $set: {
        username: data.username,
        age: data.age,
        weight: data.weight,
        height: data.height,
      },
    },
    { returnOriginal: false }
  )
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err.message);
    });
});

//PATCH update user settings by email
APIrouter.patch("/updateUserPassword/:email", (req, res) => {
  User.findOneAndUpdate(
    { email: req.params.email },
    {
      $set: {
        password: req.body.newPassword,
      },
    },
    { returnOriginal: false }
  )
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err.message);
    });
});

export { APIrouter };
