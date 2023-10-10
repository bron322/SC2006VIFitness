import React, { useState, useContext, useEffect } from "react";
import "./Calendar.css";
import { getMonth } from "./util";
import CalendarHeader from "./components/CalendarHeader";
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";
import GlobalContext from "./context/GlobalContext";
import EventModal from "./components/EventModal";
import ContextWrapper from "./context/ContextWrapper";
function Calendar() {
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <>
      <ContextWrapper>
        {showEventModal && <EventModal />}
        <div className="h-screen flex flex-col">
          <CalendarHeader />
          <div className="flex flex-1">
            <Sidebar />
            <Month month={currenMonth} />
          </div>
        </div>
      </ContextWrapper>
    </>
  );
}

export default Calendar;
