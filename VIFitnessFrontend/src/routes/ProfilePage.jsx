import { useState } from "react";
import { Outlet } from "react-router-dom";
import Topbar from "../components/topbar";
// import Sidebar from "../components/sidebars";
import { MyProSidebarProvider } from "../components/sidebarContext"
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import './styles/profilePage.css' 


function ProfilePage() {
  const [theme, colorMode] = useMode();
  // const [isSidebar, setIsSidebar] = useState(true);

  return (
    <>
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* <div className="app"> */}
          {/* <Sidebar isSidebar={isSidebar} /> */}
          <MyProSidebarProvider>
          <div style={{ height: "100%", width: "100%" }}>
          <main className="content">
            {/* <Topbar setIsSidebar={setIsSidebar} /> */}
            <Topbar/>
            <Outlet />
          </main>
          {/* </div> */}
        </div>
        </MyProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
    </>
  );
};

export default ProfilePage;