import React, { useState, useContext, useEffect } from "react";
import "./App.css";
import { getMonth } from "./util";
import CalendarHeader from "./components/CalendarHeader";
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";
import GlobalContext from "./context/GlobalContext";
import EventModal from "./components/EventModal";

function App() {
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState(null);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <>
      {showEventModal && <EventModal />}

      <div className="h-50 flex flex-col">
        <CalendarHeader />
        <div className="flex flex-1">
          <Sidebar setSelectedMuscleGroup={setSelectedMuscleGroup} />
          <Month month={currenMonth} selectedMuscleGroup={selectedMuscleGroup} />
        </div>
      </div>
    </>
  );
}

export default App;
