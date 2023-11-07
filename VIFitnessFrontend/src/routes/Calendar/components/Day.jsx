import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";
import { useAuth } from "@/hooks/AuthProvider"; 
import { useTheme } from "@mui/material"; 
import { tokens } from "@/routes/theme"; 

export default function Day({ day, rowIdx }) {
  const [dayEvents, setDayEvents] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {user} = useAuth();
  const {
    setDaySelected,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
  } = useContext(GlobalContext);

  useEffect(() => { 
    const events = user.workouts.filter( 
      (evt) => 
        dayjs(evt.date).format("DD-MM-YY") === day.format("DD-MM-YY") 
    ); 
    setDayEvents(events);  
  },[filteredEvents,day]);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  }
  return (
    <div className="border border-gray-200 flex flex-col">
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm mt-1">{day.format("ddd").toUpperCase()}</p>
        )}
        <p className={`text-sm p-1 my-1 text-center  ${getCurrentDayClass()}`}>
          {day.format("DD")}
        </p>
      </header>
      <div
        className="flex-1 cursor-pointer self-center justify-self-center w-11/12"
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedEvent(evt)}
            className={`p-1 text-gray-400 text-sm rounded mb-1 truncate self-center justify-self-center text-center`}
            style={{ backgroundColor: colors.accent.foreground }}
          >
            {evt.name}
          </div>
        ))}
      </div>
    </div>
  );
}
