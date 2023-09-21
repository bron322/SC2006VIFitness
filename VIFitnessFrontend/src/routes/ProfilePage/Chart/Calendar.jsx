import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
// import { formatDate } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
    Box,
  } from "@mui/material";


function Calendar() {
    const [currentEvents, setCurrentEvents] = useState([]);
    const handleDateClick = (selected) => {
        const title = prompt("Please enter a new title for your event");
        const calendarApi = selected.view.calendar;
        calendarApi.unselect();
    
        if (title) {
          calendarApi.addEvent({
            id: `${selected.dateStr}-${title}`,
            title,
            start: selected.startStr,
            end: selected.endStr,
            allDay: selected.allDay,
          });
        }
    };
      
    const handleEventClick = (selected) => {
        if (
          window.confirm(
            `Are you sure you want to delete the event '${selected.event.title}'`
          )
        ) {
          selected.event.remove();
        }
    };
    return (
        <Box >
        <FullCalendar height="32vh"
        plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
        ]}
        // headerToolbar={{
        //     left: "prev,next today",
        //     center: "title",
        //     right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
        // }}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        select={handleDateClick}
        eventClick={handleEventClick}
        eventsSet={(events) => setCurrentEvents(events)}
        initialEvents={[
            {
            id: "12315",
            title: "All-day event",
            date: "2022-09-14",
            },
            {
            id: "5123",
            title: "Timed event",
            date: "2022-09-28",
            },
        ]}
        />
       </Box>
    )
}
export default Calendar;