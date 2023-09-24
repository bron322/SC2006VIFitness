import React from "react";
import BackgroundImages from "../components/WorkoutBG";
import '../components/styles/WorkoutBackground.css';
import Topbar from "../components/topbar";
import Sidebar from "../components/sidebars";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import './styles/profilePage.css' 
import { useState } from "react";

export default function WorkoutPlannerPage() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
        <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
      <div className="BG">
        <BackgroundImages/>
        {/* <div class="object-left">
          <Sidebar/>
        </div> */}
     </div>
      {/* <div class="relative h-screen">
        <div class="bg-gray-800 text-white py-4 px-6 w-full absolute top-0 left-0 z-10">
          {/* <Topbar/> */}
        {/* </div>
        <div class="bg-gray-200 w-64 h-screen absolute top-0 left-0 z-20">
          {/* <Sidebars/> */}
        {/* </div>
        <div class="ml-64 p-6">
          {/* <BankgroundImages/> */}
        {/* </div>
      </div>   */}
                </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
    </>
  );
}
