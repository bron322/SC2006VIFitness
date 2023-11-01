import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";


const labelsClasses = ["white", "gray", "green", "blue", "red", "purple"];

export default function AddWorkoutButton() {
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
      title: "Workout Name",
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };
    if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
    }
  }

  return (
    <button onClick={handleSubmit}>Add Workout to Calendar</button>
  );
}

