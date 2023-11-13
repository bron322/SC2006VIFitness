import React from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import PlannerComponent from "../components/PlannerComponent";
import '../components/styles/WorkoutBackground.css';

export default function WorkoutPlannerPage() {
  return (
    <>
          <div className="overflow-hidden">
              <PlannerComponent />
              <Outlet/>
          </div>
    </>
  );
}
