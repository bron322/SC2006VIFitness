import React from "react";
import CreateEventButton from "./CreateEventButton";
import SmallCalendar from "./SmallCalendar";
import Labels from "./Labels";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";

export default function Sidebar( { setSelectedMuscleGroup } ) {
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
          style={{backgroundColor:colors.accent.default, width:"80%"}}
        >
          <option value="">All</option>
          <option value="biceps">Biceps</option>
          <option value="abductors">Abductors</option>
          {/* Add more muscle groups as needed */}
        </select>
      </div>
    </aside>
  );
}
