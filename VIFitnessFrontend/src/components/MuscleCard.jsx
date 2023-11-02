import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ExerciseCard from './ExerciseCard';
import Calves from "./styles/photos/Calves.png";
import Glutes from "./styles/photos/Glutes.png";
import Hamstring from "./styles/photos/Hamstring.jpg";
import Quads from "./styles/photos/Quads.png";
import DatePickerMui from './DatePickerMui';
import APIDataService from "../services/APIDataService";
import { useState } from "react";
import ExerciseService from "../services/ExerciseService";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 3,
  px: 3,
  pb: 3,
};

export default function MuscleCard({ img, title, description }) {
  const [workoutData, setWorkoutData] = useState([]);
  const [open, setOpen] = React.useState(false);

  const musclecardhandleOpen = async (e) => {
    const bodypart = e.target.title; //this doesn't work
    try {
      const response = await ExerciseService.queryWorkout(bodypart);
      console.log(response.data);
      setWorkoutData(response.data);

    } catch (error) {
      console.log(error);
    }
    console.log("hello")
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Card sx={{ width: 200, height: 430 }} onClick={musclecardhandleOpen}>
        <CardActionArea>
          <CardMedia sx={{ maxWidth: 350, height: 350 }}
            component="img"
            image={img}
          />
          <CardContent>
            <Typography gutterBottom variant="h3" component="div" className='text-center'>
              {title}
            </Typography>
            <Typography variant="h5" color="text.secondary" className='text-center'>
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
        <Box sx={{ ...style, width: 800, height: 600 }}>
          <Typography variant="h1" className="text-center">
            Exercises
          </Typography>
          {/* <h2 id="parent-modal-title">Exercises</h2> */}
          <div className="flex-grow pb-8">
            <div className="grid grid-cols-3 grid-rows-2 gap-x-0 gap-y-8 overflow-y-auto">

              {/* Card 1 */}
              <div className="flex justify-center">
                <ExerciseCard
                  img={Quads}
                  title="Nigga"
                  description="nice"
                />
              </div>

              {/* Card 2 */}
              <div className="flex justify-center">
                <ExerciseCard
                  img={Hamstring}
                  title="Sohai"
                  description="123"
                />
              </div>

              {/* Card 3 */}
              <div className="flex justify-center">
                <ExerciseCard
                  img={Calves}
                  title="Bro"
                  description="123"
                />
              </div>

              {/* Card 4 */}
              <div className="flex justify-center">
                <ExerciseCard
                  img={Glutes}
                  title="Pooh"
                  description="123"
                />
              </div>

              {/* Card 5 */}
              <div className="flex justify-center">
                <ExerciseCard
                  img="https://i2-prod.dailystar.co.uk/incoming/article27469447.ece/ALTERNATES/s615b/0_JS271931188.jpg"
                  title="Ng"
                  description="123"
                />
              </div>

              {/* Card 6 */}
              <div className="flex justify-center">
                <ExerciseCard
                  img="https://www.greatestphysiques.com/wp-content/uploads/2016/09/Arnold-Schwarzenegger-1r4.jpg"
                  title="Bron"
                  description="123"
                />
              </div>

            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}






