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

  const urls={
    "Hip Circles (Prone)": "https://www.youtube.com/embed/UyY0ZoeELdo",
    "Standing Hip Circles": "https://www.youtube.com/embed/5legRVBfFxk",
    "Clam": "https://www.youtube.com/embed/Mra0MJnMHh0",
    "Incline Hammer Curls": "https://www.youtube.com/embed/Uxs6P7obg3I",
    // Find more
    // Must change endpoint from watch to embed
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
