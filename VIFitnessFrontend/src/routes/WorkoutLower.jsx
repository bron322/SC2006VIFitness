import React from 'react';
import Topbar from "./topbar";
import LowerBody from "../components/LowerBody";

export default function WorkoutLower() {
  return (
    <>
      <div className="Topbar">
        <Topbar/>
      </div>
      <div class="object-left">
        <LowerBody/>
      </div>
    </>
  );
};