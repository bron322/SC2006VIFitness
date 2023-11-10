import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import { Toaster, toast } from "react-hot-toast";
import APIDataService from "../../../services/APIDataService";
import ExerciseService from "../../../services/ExerciseService";
import SmallCalendar from "./SmallCalendar";

const labelsClasses = ["white", "gray", "green", "blue", "red", "purple"];

export default function AddWorkoutButton(props) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [exercisesToAddToCalendar, setExercisesToAddToCalendar] = useState([]);
  const { daySelected, dispatchCalEvent, selectedEvent, smallCalendarMonth } =
    useContext(GlobalContext);

  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );

  const addExerciseToCalendar = async (
    exerciseName,
    isCompleted = false,
    date,
    month
  ) => {
    setExercisesToAddToCalendar((prevExercises) => [
      ...prevExercises,
      {
        exercise: {
          name: exerciseName,
          isCompleted,
          date,
          month,
        },
      },
    ]);
  };

  const handleAddToCalendar = async () => {
    try {
      // Check if there are exercises to add
      if (exercisesToAddToCalendar.length === 0) {
        alert("No exercises selected to add to calendar.");
        return;
      }
      const exerciseDataToAdd = {
        username: "bron322", // Replace with the actual username
        exerciseData: exercisesToAddToCalendar, // Pass the list of exercise names to the server
      };
      // Call the addingExercise function to add the exercise
      const updatedUserData = await APIDataService.addingExercise(
        exerciseDataToAdd
      );
      // You can also update your component's state or perform any other actions based on the response data
      console.log("Updated user data:", updatedUserData);
    } catch (error) {
      console.error("Error adding exercise:", error);
      // Handle errors here
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    const calendarEvent = {
      title: props.exerciseName,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };
    if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: calendarEvent });
      addExerciseToCalendar(
        props.exerciseName,
        false,
        daySelected.format("D"),
        smallCalendarMonth + 1
      ).then(() => {});
      console.log("Day:", daySelected.format("D"));
      console.log("Month:", smallCalendarMonth + 1);
      toast.success("Added to Calendar!");
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
    }
  }

  return (
    <button onClick={handleSubmit}>Add Workout to Calendar</button>
  );
}
