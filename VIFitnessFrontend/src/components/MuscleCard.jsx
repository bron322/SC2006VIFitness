import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import ExerciseCard from './ExerciseCard';
import Calves from "./styles/photos/Calves.png";
import Glutes from "./styles/photos/Glutes.png";
import Hamstring from "./styles/photos/Hamstring.jpg";
import Quads from "./styles/photos/Quads.png";
import DatePickerMui from './DatePickerMui';

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

function ChildModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Confirm</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 400, height: 150 }}>
          <Typography variant="h1" className="text-center pb-3 font-extrabold" id="child-modal-title">
            Added to Calendar!
          </Typography>
          {/* <h2 id="child-modal-title">Added to calendar</h2> */}
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function MuscleCard({img, title, description}) {
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Card sx={{ width: 200, height: 430 }} onClick={handleOpen}>
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
                title="Quads"
                description="nice"
                />
              </div>

              {/* Card 2 */}
              <div className="flex justify-center">
                <ExerciseCard
                img={Hamstring}
                title="Hamstrings"
                description="123"
                />
              </div>

              {/* Card 3 */}
              <div className="flex justify-center">
                <ExerciseCard
                img={Calves}
                title="Calves"
                description="123"
                />
              </div>

              {/* Card 4 */}
              <div className="flex justify-center">
                <ExerciseCard
                img={Glutes}
                title="Glutes"
                description="123"
                />
              </div>

              {/* Card 5 */}
              <div className="flex justify-center">
                <ExerciseCard
                img="https://i2-prod.dailystar.co.uk/incoming/article27469447.ece/ALTERNATES/s615b/0_JS271931188.jpg"
                title="Hell Yeah"
                description="123"
                />
              </div>

              {/* Card 6 */}
              <div className="flex justify-center">
                <ExerciseCard
                img="https://www.greatestphysiques.com/wp-content/uploads/2016/09/Arnold-Schwarzenegger-1r4.jpg"
                title="Nice"
                description="123"
                />
              </div>

            </div>
          </div>
          <p id="parent-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p>
          <ChildModal />
        </Box>
      </Modal>
    </div>
  );
}






