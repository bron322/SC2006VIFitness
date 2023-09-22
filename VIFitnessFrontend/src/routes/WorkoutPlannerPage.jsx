import React from "react";
import BackgroundImages from "../components/WorkoutBG";
import '../components/styles/WorkoutBackground.css';
import Topbar from "./topbar";
import Sidebars from "../routes/sidebars.jsx";

export default function WorkoutPlannerPage() {
  return (
    <>
      {/*<div className="Topbar">
        <Topbar/>
      </div>
      <div className="BG">
        <BackgroundImages/>
        <div class="object-left">
          <Sidebars/>
        </div>
  </div>*/}
      <div class="relative h-screen">
        <div class="bg-gray-800 text-white py-4 px-6 w-full absolute top-0 left-0 z-10">
          <Topbar/>
        </div>
        <div class="bg-gray-200 w-64 h-screen absolute top-0 left-0 z-20">
          <Sidebars/>
        </div>
        <div class="ml-64 p-6">
          <BankgroundImages/>
        </div>
      </div>
    </>
  );
}
