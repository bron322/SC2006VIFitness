import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ExerciseCard from "./ExerciseCard";
import APIDataService from "../services/APIDataService";
import { useState } from "react";
import ExerciseService from "../services/ExerciseService";
import { IndeterminateCheckBoxRounded } from "@mui/icons-material";
import { useSpring, animated } from "react-spring";
import { bouncy } from "ldrs";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 10,
  pt: 3,
  px: 3,
  pb: 3,
};

export default function MuscleCard({ img, title, description }) {
  const [workoutData, setWorkoutData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [flip, setFlip] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  bouncy.register();

  const musclecardhandleOpen = async () => {
    try {
      setLoading(true); //Set loading to true when waiting for data
      setOpen(true);
      const response = await ExerciseService.queryWorkout(title);
      setWorkoutData(response.data);

      setLoading(false); // Set loading to false when the modal is ready to be shown
      setFlip(!flip);
    } catch (error) {
      console.log(error);
      setLoading(false); // Ensure loading is set to false on error as well
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const props = useSpring({
    to: { opacity: open ? 1 : 0 },
    from: { opacity: 0 },
  });

  const urls = {
    "Atlas Stones": "",
    "Axle Deadlift": "",
    "Back extension": "",
    "Band Hip Adductions": "",
    "Barbell Deadlift": "",
    "Barbell Full Squat": "",
    "Barbell Hip Thrust": "",
    "Barbell back squat to box": "",
    "Barbell deficit deadlift": "",
    "Barbell glute bridge": "",
    "Bent Over Two-Arm Long Bar Ro": "",
    "Bottoms Up": "",
    "Cable V-bar push-down": "",
    "Calf Press": "",
    "Calf Press On The Leg Press Mac": "",
    "Clam": "",
    "Clean Deadlift": "",
    "Clean from Blocks": "",
    "Close-grip bench press": "",
    "Close-grip pull-down": "",
    "Deadlift with Bands": "",
    "Decline EZ-bar skullcrusher": "",
    "Dumbbell Bench Press": "",
    "Dumbbell Flyes": "",
    "Dumbbell V-Sit Cross Jab": "",
    "Dumbbell farmer's walk": "",
    "Dumbbell floor press": "",
    "EZ-Bar Curl": "",
    "EZ-Bar Skullcrusher": "",
    "EZ-bar spider curl": "",
    "Elbow plank": "",
    "Fire Hydrant": "",
    "Glute bridge": "",
    "Groin and Back Stretch": "",
    "Groiners": "",
    "Hammer Curls": "",
    "Hip Circles (Prone)": "",
    "Hyperextensions With No Hyper": "",
    "Iliotibial band SMR": "https://www.youtube.com/watch?v=_JTKoCtGAtg&ab_channel=COR",
    "Incline Hammer Curls": "https://www.youtube.com/shorts/8Af8ZxOsG2o",
    "Incline dumbbell bench press": "https://www.youtube.com/watch?v=cbRSu8Ws_hs&ab_channel=BroserBuilt",
    "Landmine twist": "https://www.youtube.com/watch?v=wpfYRQGYVm4&ab_channel=ColossusFitness",
    "Lateral hop": "https://www.youtube.com/watch?v=bqbZqxqs8tY",
    "Low-cable cross-over": "https://www.youtube.com/watch?v=wnFEC_34Bls",
    "Muscle Up": "https://www.youtube.com/watch?v=Al2P0nR2lB8&ab_channel=RogueFitness",
    "One-Arm Dumbbell Row": "https://www.youtube.com/watch?v=Qx2f4YwJAu4&ab_channel=BonytoBombshell",
    "One-Arm Long Bar Row": "https://www.youtube.com/watch?v=ExuDK5iWKM8&ab_channel=mountaindog1",
    "Palms-down wrist curl over benc": "https://www.youtube.com/watch?v=s1MHtPsi8vY&ab_channel=Musqle",
    "Palms-up wrist curl over bench": "https://www.youtube.com/watch?app=desktop&v=dQtMZ3ZEGwU&ab_channel=FitnessArabia",
    "Power Snatch": "https://www.youtube.com/watch?v=TL8SMp7RdXQ&ab_channel=CrossFit",
    "Pull-up": "https://www.youtube.com/watch?v=eGo4IYlbE5g&ab_channel=Calisthenicmovement",
    "Pullups": "https://www.youtube.com/watch?v=eGo4IYlbE5g&ab_channel=Calisthenicmovement",
    "Push-press": "https://www.youtube.com/watch?v=iaBVSJm78ko&ab_channel=CrossFit",
    "Pushups": "https://www.youtube.com/watch?v=bt5b9x9N0KU&ab_channel=Well%2BGood",
    "Reverse-grip bent-over row": "https://www.youtube.com/watch?v=3gdGSSgDby8&ab_channel=KAGED",
    "Rickshaw Carry": "https://m.youtube.com/watch?v=JiA5iZsbYC4",
    "Rocking Standing Calf Raise": "https://www.youtube.com/watch?v=k67UjgvJdEk&ab_channel=ChadMollickDotCom",
    "Rocky Pull-Ups-Pulldowns": "https://www.youtube.com/watch?v=OBJl9qHZe0E&ab_channel=Nh%E1%BB%B1tL%C3%AA",
    "Romanian Deadlift With Dumbbells": "https://www.youtube.com/watch?v=6BxkV9h3h2k&ab_channel=MikeCampbell",
    "Romanian Deadlift from Deficit": "https://www.youtube.com/watch?v=wYc-kWqokaY&ab_channel=GetPeachy",
    "Seated Calf Raise": "https://www.youtube.com/watch?v=JbyjNymZOt0&ab_channel=LIVESTRONG.COM",
    "Shotgun row": "https://www.youtube.com/watch?v=UWK2XrUMjyw&ab_channel=MyPTHub",
    "Side Leg Raises": "https://www.youtube.com/watch?app=desktop&v=JRmu-BJw698&ab_channel=TeamBathTV",
    "Single leg glute bridge": "https://www.youtube.com/watch?v=AVAXhy6pl7o&ab_channel=MedStarHealth",
    "Single-leg cable hip extension": "https://www.youtube.com/watch?v=Fr6fdKPdyfM&ab_channel=HealthfxPhysiotherapy",
    "Single-leg glute bridge": "https://www.youtube.com/watch?v=_K_di6h2-Wg&ab_channel=Well%2BGood",
    "Single-Leg Press": "https://www.youtube.com/watch?v=sxF9BcDt-yY&ab_channel=PureGym",
    "Smith Machine Calf Raise": "https://www.youtube.com/watch?v=avO_qtvHJAg&ab_channel=MyTrainingApp",
    "Standing Calf Raises": "https://www.youtube.com/watch?app=desktop&v=k67UjgvJdEk&ab_channel=ChadMollickDotCom",
    "Standing Hip Circles": "https://www.youtube.com/watch?app=desktop&v=OvJMG4_nMFc&ab_channel=CoachAlyssaChang",
    "Standing behind-the-back wrist": "https://www.youtube.com/watch?v=xrS1UCC24do&ab_channel=TestosteroneNation",
    "Standing cable low-to-high twist": "https://m.youtube.com/watch?v=_mHR9ewsHZg",
    "Step-up with knee raise": "https://www.youtube.com/watch?v=P_Pp7aRTau0&ab_channel=MyPTHub",
    "Straight-bar wrist roll-up": "https://www.youtube.com/watch?v=lpqSgebi65k&ab_channel=CoachDanBlewett",
    "Sumo deadlift": "https://www.youtube.com/watch?v=cDlOSfu-zHY&ab_channel=MindPumpTV",
    "Suspended ab fall-out": "https://www.youtube.com/watch?v=9JfJSPhH-0U&ab_channel=FitSWFitnessSoftware",
    "T-Bar Row": "https://www.youtube.com/watch?v=j3Igk5nyZE4&ab_channel=ScottHermanFitness",
    "T-Bar Row with Handle": "https://www.youtube.com/watch?v=KDEl3AmZbVE&ab_channel=Bodybuilding.com",
    "Thigh abductor": "https://www.youtube.com/watch?v=mP-FfS2HC9Q&ab_channel=TheGymInTheNorth",
    "Thigh adductor": "https://www.youtube.com/shorts/LM_NZjWAsSo",
    "Tire flip": "https://www.youtube.com/watch?v=YoCSGfccgzU&ab_channel=Men%27sHealth",
    "Triceps dip": "https://www.youtube.com/watch?v=0326dy_-CzM&ab_channel=LIVESTRONG.COM",
    "Weighted bench dip": "https://www.youtube.com/watch?app=desktop&v=egQiO0K-BEw&ab_channel=Exercises.com.au",
    "Weighted pull-up": "https://www.youtube.com/watch?v=HuuyDNGrCI8&ab_channel=ScottHermanFitness",
    "Wide-grip barbell curl": "https://www.youtube.com/watch?v=crk9ZzNAG_Q&ab_channel=WeightTrainingCom",
    "Zottman Curl": "https://www.youtube.com/watch?v=ZrpRBgswtHs&ab_channel=ScottHermanFitness"
};

  return (
    <>
      <div>
        <div>
          {/* {loading && <CircularIndeterminate />} */}

          <Card
            sx={{ width: 200, height: 400 }}
            onClick={musclecardhandleOpen}
            className={`${isHovered ? "hover-effect" : ""}`}
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}
          >
            <CardActionArea>
              <CardMedia
                sx={{ maxWidth: 350, height: 350 }}
                component="img"
                image={img}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h3"
                  component="div"
                  className="text-center"
                >
                  {title}
                </Typography>
                <Typography
                  variant="h5"
                  color="text.secondary"
                  className="text-center"
                >
                  {description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            {loading ? (
              <div className="loading-effect w-screen h-screen flex justify-center items-center">
                <l-bouncy size="45" speed="1.75" color="#3b82f6"></l-bouncy>
              </div>
            ) : (
              <animated.div style={{ ...style, ...props }}>
                <Box sx={{ ...style, width: 800, height: 650 }}>
                  <Typography variant="h1" className="text-center">
                    Exercises
                  </Typography>
                  <div className="flex-grow pb-8">
                    <div className="grid grid-cols-3 grid-rows-2 gap-x-0 gap-y-8 overflow-y-auto">
                      {workoutData.slice(0, 6).map((item, index) => {
                        const correctedName =
                          item.name === "Rocky Pull-Ups/Pulldowns"
                            ? "Shotgun row"
                            : item.name;
                            console.log(item.name)
                        return (
                          <div key={item.instructions}>
                            <div className="flex justify-center">
                              <ExerciseCard
                                img={`/exerciseImage/${correctedName}.jpg`} // Match name of image with title
                                title={correctedName} // Use the corrected name as the title
                                description={item.difficulty} // Use the item difficulty
                                instruction={item.instructions} // Passing in the instruction
                                equipment={item.equipment}
                                muscle={item.muscle}
                                videoUrl={urls[item.name]}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Box>
              </animated.div>
            )}
          </Modal>
        </div>
      </div>
    </>
  );
}
