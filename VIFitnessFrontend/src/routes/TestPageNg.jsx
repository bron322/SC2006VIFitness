import { useContext, useState } from "react";
import GlobalContext from "./Calendar/context/GlobalContext";
import AddWorkoutButton from "./Calendar/components/AddWorkoutButton";
import { Form, Link } from "react-router-dom";
import SmallCalendar from "./Calendar/components/SmallCalendar";

const TestPageNg = () => {
  return (
    <div>
      <div className="w-52">
        <SmallCalendar />
      </div>
      <AddWorkoutButton />
    </div>
  );
};

export default TestPageNg;
