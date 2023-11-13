import React from "react";
import CreateEventButton from "./CreateEventButton";
import SmallCalendar from "./SmallCalendar";
import Labels from "./Labels";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";

export default function Sidebar({ setSelectedMuscleGroup }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <aside className="border p-5 w-64">
      {/* <CreateEventButton /> */}
      <SmallCalendar />
      {/* <Labels /> */}
      <div className="mb-2 mt-16 w-56">
        <label htmlFor="muscle" className="w-full text-xl">Select Muscle Group:</label>
        <select
          id="muscle"
          onChange={(e) => setSelectedMuscleGroup(e.target.value)}
          style={{ backgroundColor: colors.accent.default, width: "80%" }}
        >
          <option value="">All</option>
          <option value="abdominals">Abdominals</option>
          <option value="abductors">Abductors</option>
          <option value="adductors">Adductors</option>
          <option value="biceps">Biceps</option>
          <option value="calves">Calves</option>
          <option value="chest">Chest</option>
          <option value="forearms">Forearms</option>
          <option value="glutes">Glutes</option>
          <option value="hamstrings">Hamstrings</option>
          <option value="lats">Lats</option>
          <option value="lower_back">Lower Back</option>
          <option value="middle_back">Middle Back</option>
          <option value="quadriceps">Quadriceps</option>
          <option value="triceps">Triceps</option>
        </select>
      </div>
    </aside>
  );
}
