import { useState } from "react";
import { Outlet } from "react-router-dom";
import Topbar from "../components/topbar";
// import Sidebar from "../components/sidebars";
import { MyProSidebarProvider } from "../components/sidebarContext";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import "./styles/profilePage.css";

function ProfilePage() {
  return (
    <>
      <CssBaseline />
      <MyProSidebarProvider>
        <div style={{ height: "100%", width: "100%" }}>
          <main className="content">
            <Topbar />
            <Outlet />
          </main>
        </div>
      </MyProSidebarProvider>
    </>
  );
}

export default ProfilePage;
