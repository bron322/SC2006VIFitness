import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";
import { useAuth } from "@/hooks/AuthProvider"; 
import { useTheme } from "@mui/material"; 
import { tokens } from "@/routes/theme"; 

export default function Day({ day, rowIdx, selectedMuscleGroup }) {
  const [dayEvents, setDayEvents] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {user} = useAuth();
  const {
    daySelected,
    setDaySelected,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
  } = useContext(GlobalContext);

  // useEffect(() => { 
  //   const events = user.workouts.filter( 
  //     (evt) => 
  //       dayjs(evt.date).format("DD-MM-YY") === day.format("DD-MM-YY") 
  //   ); 
  //   setDayEvents(events);  
  // },[filteredEvents,day]);
  useEffect(() => { 
    const events = user.workouts.filter((evt) => {
      const isSameDay = dayjs(evt.date).format("DD-MM-YY") === day.format("DD-MM-YY");
      const isMatchingMuscleGroup = !selectedMuscleGroup || evt.muscle === selectedMuscleGroup;
      return isSameDay && isMatchingMuscleGroup;
    }); 
    setDayEvents(events);
  }, [selectedMuscleGroup, day, user.workouts]);
  

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  }

  const handleEventClick = (event) => {
    setSelectedEvent(event)
    setShowEventModal(true)
  }

  function getDayClass(day) {
    const format = "DD-MM-YY";
    const nowDay = dayjs().format(format);
    const currDay = day.format(format);
    const slcDay = daySelected && daySelected.format(format);
    if (nowDay === currDay) {
      return "bg-blue-500 rounded-full text-white";
    } else if (currDay === slcDay) {
      return "bg-blue-100 rounded-full text-blue-600 font-bold";
    } else {
      return "";
    }
  }

  return (
    <div className="border border-gray-200 flex flex-col" style={{ height: "200px", overflow: "auto" }}>
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm mt-1">{day.format("ddd").toUpperCase()}</p>
        )}
        <p className={`text-sm p-1 my-1 text-center  ${getCurrentDayClass()} ${getDayClass(day)}`}>
          {day.format("DD")}
        </p>
      </header>
      <div
        className="flex-1 cursor-pointer self-center justify-self-center w-11/12"
        onClick={() => {
          setDaySelected(day);
          // setShowEventModal(true);
        }}
      >
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={() => handleEventClick(evt)}
            className={`p-1 text-gray-400 text-sm rounded mb-1 truncate self-center justify-self-center text-center overflow-auto`}
            style={{
              backgroundColor: evt.isCompleted ? "green" : colors.accent.foreground,
            }}
          >
            {evt.name}
          </div>
        ))}
      </div>
    </div>
  );
}
