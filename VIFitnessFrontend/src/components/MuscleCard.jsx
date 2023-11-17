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
    "Atlas Stones": "https://www.youtube.com/embed/pWziNDVSrJ8",
    "Axle Deadlift": "https://www.youtube.com/embed/BTsNP5zhCL4",
    "Back extension": "https://www.youtube.com/embed/tIZppe-RB0g",
    "Band Hip Adductions": "https://www.youtube.com/embed/Vce3tIYpzhc",
    "Barbell Deadlift": "https://www.youtube.com/embed/r4MzxtBKyNE",
    "Barbell Full Squat": "https://www.youtube.com/embed/d_xB-41ieqw",
    "Barbell Hip Thrust": "https://www.youtube.com/embed/W86oVlnLqY4",
    "Barbell back squat to box": "https://www.youtube.com/embed/ZJrUiIprYVw",
    "Barbell deficit deadlift": "https://www.youtube.com/embed/hnuPZZfeRzs",
    "Barbell glute bridge": "https://www.youtube.com/embed/wPM8icPu6H8",
    "Bent Over Two-Arm Long Bar Row": "https://www.youtube.com/embed/vT2GjY_Umpw",
    "Bottoms Up": "https://www.youtube.com/embed/J5LEpIZSDS0",
    "Cable V-bar push-down": "https://www.youtube.com/embed/waGzgAr2uiY",
    "Calf Press": "https://www.youtube.com/embed/gwLzBJYoWlI",
    "Calf Press On The Leg Press Machine": "https://www.youtube.com/embed/dhRz1Ns60Zg",
    "Clam": "https://www.youtube.com/embed/vsQugiJgZZE",
    "Clean Deadlift": "https://www.youtube.com/embed/iCWAMA9Zeus",
    "Clean from Blocks": "https://www.youtube.com/embed/T4EAdzwVEg4",
    "Close-grip bench press": "https://www.youtube.com/embed/wxVRe9pmJdk",
    "Close-grip pull-down": "https://www.youtube.com/embed/IjoFCmLX7z0",
    "Deadlift with Bands": "https://www.youtube.com/embed/obM6SBVa-MU",
    "Decline EZ-bar skullcrusher": "https://www.youtube.com/embed/K__WSfPqNTU",
    "Dumbbell Bench Press": "https://www.youtube.com/embed/VmB1G1K7v94",
    "Dumbbell Flyes": "https://www.youtube.com/embed/UKwkChzThig&ab_channel=MyTrainingApp",
    "Dumbbell V-Sit Cross Jab": "https://www.youtube.com/embed/VF7N6ZzrLWg&ab_channel=SEXioFIT",
    "Dumbbell farmer's walk": "https://www.youtube.com/embed/E0i6N7Ozi7c&ab_channel=NiaShanks",
    "Dumbbell floor press": "https://www.youtube.com/embed/uUGDRwge4F8&ab_channel=ScottHermanFitness",
    "EZ-Bar Curl": "https://www.youtube.com/embed/6LrOTcr595A&ab_channel=KAGED",
    "EZ-Bar Skullcrusher": "https://www.youtube.com/embed/D47mYdoKllE&ab_channel=MyTrainingApp",
    "EZ-bar spider curl": "https://www.youtube.com/embed/nSLVUVDpG-0&ab_channel=FrankdenBlanken",
    "Elbow plank": "https://www.youtube.com/embed/zuHZyVg3zRA",
    "Fire Hydrant": "https://www.youtube.com/embed/La3xYT8MGks",
    "Glute bridge": "https://www.youtube.com/embed/wPM8icPu6H8&ab_channel=Well%2BGood",
    "Groin and Back Stretch": "https://www.youtube.com/embed/NAPOfCnC294&ab_channel=OrigymPersonalTrainerCourses",
    "Groiners": "https://www.youtube.com/embed/qdSSM1VWIMM&ab_channel=IronCrewAthletics",
    "Hammer Curls": "https://www.youtube.com/embed/zC3nLlEvin4&ab_channel=ScottHermanFitness",
    "Hip Circles (Prone)": "https://www.youtube.com/embed/altA7815AGs&ab_channel=Cioffredi%26AssociatesPhysicalTherapy",
    "Hyperextensions With No Hyperextension Bench": "https://www.youtube.com/embed/BUnzhow7160&ab_channel=TuscaloosaFitness-JakeBarnettCSCS",
    "Iliotibial band SMR": "https://www.youtube.com/embed/_JTKoCtGAtg&ab_channel=COR",
    "Incline Hammer Curls": "https://www.youtube.com/shorts/8Af8ZxOsG2o",
    "Incline dumbbell bench press": "https://www.youtube.com/embed/cbRSu8Ws_hs&ab_channel=BroserBuilt",
    "Landmine twist": "https://www.youtube.com/embed/wpfYRQGYVm4&ab_channel=ColossusFitness",
    "Lateral hop": "https://www.youtube.com/embed/bqbZqxqs8tY",
    "Low-cable cross-over": "https://www.youtube.com/embed/wnFEC_34Bls",
    "Muscle Up": "https://www.youtube.com/embed/Al2P0nR2lB8&ab_channel=RogueFitness",
    "One-Arm Dumbbell Row": "https://www.youtube.com/embed/Qx2f4YwJAu4&ab_channel=BonytoBombshell",
    "One-Arm Long Bar Row": "https://www.youtube.com/embed/ExuDK5iWKM8&ab_channel=mountaindog1",
    "Palms-down wrist curl over bench": "https://www.youtube.com/embed/s1MHtPsi8vY&ab_channel=Musqle",
    "Palms-up wrist curl over bench": "https://www.youtube.com/embed/dQtMZ3ZEGwU&ab_channel=FitnessArabia",
    "Power Snatch": "https://www.youtube.com/embed/TL8SMp7RdXQ&ab_channel=CrossFit",
    "Pull-up": "https://www.youtube.com/embed/eGo4IYlbE5g&ab_channel=Calisthenicmovement",
    "Pullups": "https://www.youtube.com/embed/eGo4IYlbE5g&ab_channel=Calisthenicmovement",
    "Push-press": "https://www.youtube.com/embed/iaBVSJm78ko&ab_channel=CrossFit",
    "Pushups": "https://www.youtube.com/embed/bt5b9x9N0KU&ab_channel=Well%2BGood",
    "Reverse-grip bent-over row": "https://www.youtube.com/embed/3gdGSSgDby8&ab_channel=KAGED",
    "Rickshaw Carry": "https://m.youtube.com/embed/JiA5iZsbYC4",
    "Rocking Standing Calf Raise": "https://www.youtube.com/embed/k67UjgvJdEk&ab_channel=ChadMollickDotCom",
    "Rocky Pull-Ups-Pulldowns": "https://www.youtube.com/embed/OBJl9qHZe0E&ab_channel=Nh%E1%BB%B1tL%C3%AA",
    "Romanian Deadlift With Dumbbells": "https://www.youtube.com/embed/6BxkV9h3h2k&ab_channel=MikeCampbell",
    "Romanian Deadlift from Deficit": "https://www.youtube.com/embed/wYc-kWqokaY&ab_channel=GetPeachy",
    "Seated Calf Raise": "https://www.youtube.com/embed/JbyjNymZOt0&ab_channel=LIVESTRONG.COM",
    "Shotgun row": "https://www.youtube.com/embed/UWK2XrUMjyw&ab_channel=MyPTHub",
    "Side Leg Raises": "https://www.youtube.com/embed/JRmu-BJw698&ab_channel=TeamBathTV",
    "Single leg glute bridge": "https://www.youtube.com/embed/AVAXhy6pl7o&ab_channel=MedStarHealth",
    "Single-leg cable hip extension": "https://www.youtube.com/embed/Fr6fdKPdyfM&ab_channel=HealthfxPhysiotherapy",
    "Single-leg glute bridge": "https://www.youtube.com/embed/_K_di6h2-Wg&ab_channel=Well%2BGood",
    "Single-Leg Press": "https://www.youtube.com/embed/sxF9BcDt-yY&ab_channel=PureGym",
    "Smith Machine Calf Raise": "https://www.youtube.com/embed/avO_qtvHJAg&ab_channel=MyTrainingApp",
    "Standing Calf Raises": "https://www.youtube.com/embed/k67UjgvJdEk&ab_channel=ChadMollickDotCom",
    "Standing Hip Circles": "https://www.youtube.com/embed/OvJMG4_nMFc&ab_channel=CoachAlyssaChang",
    "Standing behind-the-back wrist": "https://www.youtube.com/embed/xrS1UCC24do&ab_channel=TestosteroneNation",
    "Standing cable low-to-high twist": "https://m.youtube.com/embed/_mHR9ewsHZg",
    "Step-up with knee raise": "https://www.youtube.com/embed/P_Pp7aRTau0&ab_channel=MyPTHub",
    "Straight-bar wrist roll-up": "https://www.youtube.com/embed/lpqSgebi65k&ab_channel=CoachDanBlewett",
    "Sumo deadlift": "https://www.youtube.com/embed/cDlOSfu-zHY&ab_channel=MindPumpTV",
    "Suspended ab fall-out": "https://www.youtube.com/embed/9JfJSPhH-0U&ab_channel=FitSWFitnessSoftware",
    "T-Bar Row": "https://www.youtube.com/embed/j3Igk5nyZE4&ab_channel=ScottHermanFitness",
    "T-Bar Row with Handle": "https://www.youtube.com/embed/KDEl3AmZbVE&ab_channel=Bodybuilding.com",
    "Thigh abductor": "https://www.youtube.com/embed/mP-FfS2HC9Q&ab_channel=TheGymInTheNorth",
    "Thigh adductor": "https://www.youtube.com/shorts/LM_NZjWAsSo",
    "Tire flip": "https://www.youtube.com/embed/YoCSGfccgzU&ab_channel=Men%27sHealth",
    "Triceps dip": "https://www.youtube.com/embed/0326dy_-CzM&ab_channel=LIVESTRONG.COM",
    "Weighted bench dip": "https://www.youtube.com/embed/egQiO0K-BEw&ab_channel=Exercises.com.au",
    "Weighted pull-up": "https://www.youtube.com/embed/HuuyDNGrCI8&ab_channel=ScottHermanFitness",
    "Wide-grip barbell curl": "https://www.youtube.com/embed/crk9ZzNAG_Q&ab_channel=WeightTrainingCom",
    "Zottman Curl": "https://www.youtube.com/embed/ZrpRBgswtHs&ab_channel=ScottHermanFitness"
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
