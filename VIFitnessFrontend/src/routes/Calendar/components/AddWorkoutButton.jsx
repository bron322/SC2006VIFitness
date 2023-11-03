import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import { Toaster, toast } from "react-hot-toast";


const labelsClasses = ["white", "gray", "green", "blue", "red", "purple"];

export default function AddWorkoutButton(props) {
  const { daySelected, dispatchCalEvent, selectedEvent } =
    useContext(GlobalContext);

  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );

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
      toast.success("Added to Calendar!");
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
      toast.success("Added to Calendar!");
    }
  }

  return (
    <>
    <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
    <button onClick={handleSubmit}>Add Workout to Calendar</button>
    </>  
  );
}

