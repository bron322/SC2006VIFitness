import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Calves from "./styles/photos/Calves.png";
import Test from "./styles/photos/UpperBody.jpg";
import Glutes from "./styles/photos/Glutes.png";
import Hamstring from "./styles/photos/Hamstring.jpg";
import Quads from "./styles/photos/Quads.png";
import AddWorkoutButton from "../routes/Calendar/components/AddWorkoutButton";
import SmallCalendar from "../routes/Calendar/components/SmallCalendar";
import { CircularProgress } from "@mui/material";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import "./styles/exercisecard.css";
import { CalendarIcon } from "lucide-react";
import { Button as ShadcnButton } from "@/components/ui/button";
import APIDataService from "@/services/APIDataService";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "@/hooks/AuthProvider";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 3,
  px: 3,
  pb: 3,
};

function ChildModalAddtoCalendar(props) {
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
          <AddWorkoutButton exerciseName={props.exerciseName} />
        </Box>
      </Modal>
    </React.Fragment>
  );
}

function AddtoCalendarButton(props) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const { setUser } = useAuth();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    const data = {
      username: "bron322",
      exerciseData: [
        {
          exercise: {
            name: props.exerciseName,
            isCompleted: false,
            date: date,
            month: date.getMonth(),
          },
        },
      ],
    };
    // console.log(data);
    try {
      const response = await APIDataService.addingExercise(data);
      if (Object.keys(response.data).length !== 0) {
        setUser(response.data);
        toast.success("Workout added!");
      } else {
        toast.error("Something went wrong. Try again later!");
      }
    } catch (err) {
      console.log(err);
      if (err instanceof AxiosError) {
        toast.error("Something went wrong. Try again later!");
      }
    }
  };

  return (
    <React.Fragment>
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      <Button onClick={handleOpen}>Add to calendar</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 400, height: 150 }}>
          <h1>Add to Calendar</h1>
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <ShadcnButton
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </ShadcnButton>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 z-[1400]" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex mt-5 justify-end">
            <ShadcnButton onClick={handleSubmit} variant="secondary" size="sm">
              Add
            </ShadcnButton>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function ExerciseCard({
  img,
  title,
  description,
  instruction,
  equipment,
}) {
  const [open, setOpen] = React.useState(false);
  const exercisecardhandleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const descriptionToValue = {
    beginner: 33,
    intermediate: 66,
    advanced: 100,
  };

  const descriptionToColor = {
    beginner: "success",
    intermediate: "warning",
    advanced: "error",
  };

  const intValue = descriptionToValue[description];
  const colorValue = descriptionToColor[description];

  return (
    <div>
      <Card sx={{ width: 150, height: 250 }} onClick={exercisecardhandleOpen}>
        <CardActionArea>
          <CardMedia
            sx={{ maxWidth: 150, height: 120 }}
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
        <Box sx={{ ...style, width: 1000, height: 730, display: "flex" }}>
          <div className="flex">
            {/* <img className='absolute w-full h-full top-0 left-0' src={Calves} alt="Exercise" /> */}
            <img
              className="absolute w-full h-full top-0 left-0"
              src={Test}
              alt="Exercise"
            />

            {/* placeholder overlay */}
            <div
              className="animated fadeInLeft absolute w-6/12 h-full z-10 top-0 left-0 bg-black opacity-50"
              style={{ backdropFilter: "grayscale(100%) blur(100px)" }}
            />

            {/* <svg className='absolute w-6/12 h-full z-10 top-0 left-0'>
            <defs>
              <filter id="blur">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
              </filter>
            </defs>
            <image filter="url(#blur)" xlink:href="http://lorempixel.com/450/300/sports" x="0" y="0" height="300px" width="450px" />
          </svg> */}

            <div className="animated2 fadeInLeft2 absolute w-6/12 h-full z-10 top-0 left-0 overflow-y-auto">
              <div className="text-center text-5xl font-bold z-10 pb-5">
                {title}
              </div>

              <div className="flex-grow pb-5 z-20">
                <div className="font-semibold text-2xl">{"Difficulty: "}</div>
                <br></br>
                <div className="flex-col justify-center content-center items-center place-content-center place-items-center">
                  <div className="text-center">
                    <style> {""} </style>
                    <CircularProgress
                      variant="determinate"
                      color={colorValue}
                      value={intValue}
                      size="60px"
                    />
                  </div>
                  <div className="pl-1 text-center">{description}</div>
                </div>
              </div>

              <div className="flex-grow pb-5 z-20 ">
                <div className="font-semibold text-2xl">{"Instructions: "}</div>
                <br></br>
                {instruction}
              </div>

              <div className="flex-grow pb-5 z-20">
                <div className="font-semibold text-2xl">{"Equipment: "}</div>
                <br></br>
                {equipment}
              </div>

              <div className="flex-grow pb-8 z-20 text-center">
                <ChildModalAddtoCalendar exerciseName={title} />{" "}
                {/* The function is above the page */}
                <AddtoCalendarButton exerciseName={title} />
              </div>
              
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
