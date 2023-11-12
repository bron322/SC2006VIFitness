import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
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
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/AuthProvider";
import NutritionixService from "@/services/NutritionixService";
import { useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext } from "../routes/theme";

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

function AddtoCalendarButton(props) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const { user, setUser } = useAuth();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    const data = {
      username: user.username,
      exerciseData: [
        {
          name: props.exerciseName,
          isCompleted: false,
          description:'',
          date: date,
          month: date.getMonth() + 1,
          day: date.getDate(),
          year: date.getFullYear(),
          calories: props.caloriesBurnt,
          createdAt: new Date(),
        },
      ],
    };
    try {
      const response = await APIDataService.addingExercise(data);
      if (Object.keys(response.data).length !== 0) {
        setUser(response.data);
        toast.success("Workout added!");

        // Delay the setOpen(false) for 3 seconds (adjust the duration as needed)
        setTimeout(() => {
          window.location.reload(true)
        }, 400);
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
      <Button onClick={handleOpen} style={{color: 'blue'}}>Add to calendar</Button>
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
  const [caloriesBurnt, setCaloriesBurnt] = React.useState(null);

  const exercisecardhandleOpen = () => {
    setOpen(true);
    // Define the exercise name you want to look up
    const exerciseName = title; // Replace with the actual exercise name

    // Call the getExercise function with the exercise name as input
    NutritionixService.getExercise({
      query: exerciseName,
    })
      .then((response) => {
        // Check if the response is an empty array
        if (Array.isArray(response.data.exercises) && response.data.exercises.length === 0) {
          // Set a default value for nf_calories (e.g., 170)
          setCaloriesBurnt(170);
        } else {
          // Handle the response from the API
          const caloriesBurnt = response.data.exercises[0].nf_calories;
          setCaloriesBurnt(caloriesBurnt);
          console.log("Exercise Data:", caloriesBurnt);
        }
      })
      .catch((error) => {
        // Handle any errors that may occur
        console.error("Error:", error);
      });
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

  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const getBackgroundColors = () => {
    if (theme.palette.mode === 'dark') {
      return 'rgba(0, 0, 0, 1)';
    } else {
      return 'rgba(255, 255, 255, 1 )';
    }
  };

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
        <Box sx={{ ...style, width: 1000, height: 730, display: "flex" }}>
          <div className="flex">
            <img
              className="absolute w-full h-full top-0 left-0"
              src={`/exerciseImage/${title}.jpg`}
              alt="Exercise"
            />

            {/* placeholder overlay */}
            <div
              className="animated fadeInLeft absolute w-6/12 h-full z-10 top-0 left-0"
              style={{ 
                backdropFilter: "grayscale(100%) blur(100px)",
                backgroundColor: getBackgroundColors()  
              }}
            />
            <div className="animated2 fadeInLeft2 absolute w-6/12 h-full z-10 top-0 left-0 overflow-y-auto">
              <div className="text-center text-5xl font-bold z-10 pb-5">
                {title}
              </div>

              <div className="flex-grow pb-5 z-20 pl-3">
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

              <div className="flex-grow pb-5 z-20 pl-3">
                <div className="font-semibold text-2xl">{"Instructions: "}</div>
                <br></br>
                {instruction}
              </div>

              <div className="flex-grow pb-5 z-20 pl-3">
                <div className="font-semibold text-2xl">{"Equipment: "}</div>
                <br></br>
                {equipment}
              </div>

              <div className="flex-grow pb-8 z-20 pl-3">
                <div className="font-semibold text-2xl">{"Calories burnt: "}</div>
                <br></br>
                {caloriesBurnt}
              </div>
              {/* This is for calories burnt for the exercise */}

              <div className="flex-grow pb-8 z-20 text-center">
                <AddtoCalendarButton exerciseName={title} caloriesBurnt={caloriesBurnt} />
                {/* add to calendar button */}
              </div>

            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
