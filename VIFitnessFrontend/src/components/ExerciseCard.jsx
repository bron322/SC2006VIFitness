import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Calves from "./styles/photos/Calves.png";
import Glutes from "./styles/photos/Glutes.png";
import Hamstring from "./styles/photos/Hamstring.jpg";
import Quads from "./styles/photos/Quads.png";
import AddWorkoutButton from "../routes/Calendar/components/AddWorkoutButton";
import SmallCalendar from "../routes/Calendar/components/SmallCalendar";

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

function ChildModalAddtoCalendar() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Add to calendar</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 380, height: 380 }}>
          <div className="flex justify-center pb-10">
            <SmallCalendar />
          </div>
          <div className='flex justify-center'>
            <AddWorkoutButton />
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function ExerciseCard({ img, title, description, instruction, equipment }) {

  const [open, setOpen] = React.useState(false);
  const exercisecardhandleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Card sx={{ width: 150, height: 250 }} onClick={exercisecardhandleOpen}>
        <CardActionArea>
          <CardMedia sx={{ maxWidth: 150, height: 120 }}
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
          {/* <Typography variant="h1" className="text-center">
            {'Incline dumbbell curl'}
            {/* Name of exercise */}
          {/* </Typography> */}
          {/* <h2 id="parent-modal-title">Exercises</h2> */}
          {/* <div className="flex-grow pb-8">
            {'Instructions'}
            {/* Exercise details */}
          {/* </div> */}

          {/* <ChildModalAddtoCalendar /> {/*the function is above the page*/}
        <Box sx={{ ...style, width: 800, height: 650, display: 'flex' }}>
          {/* Left side for the exercise image */}
          <div className='flex'>
            <div className='top-0 flex-none w-1/3 pr-5'>{/* style={{ flex: 1, padding_right: 5}} */}
              <img src={Calves} alt="Exercise" />
            </div>
            

            {/* Right side for the title, instructions, and ChildModalAddtoCalendar */}
            <div className='flex flex-col'>{/* style={{ flex: 2, display: 'flex', flexDirection: 'column' }} */}
              <Typography variant="h1" className="text-center">
                {title}
              </Typography>
              
              <div className="flex-grow pt-10">
                {'Difficulty: '}<br></br>
                {description}
              </div>

              <div className="flex-grow">
                {'Instructions: '}<br></br>
                {instruction}
              </div>

              <div className="flex-grow">
                {'Equipment: '}<br></br>
                {equipment}
              </div>

              <ChildModalAddtoCalendar />
              
            </div>
          

            {/* <ChildModalAddtoCalendar /> The function is above the page */}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
