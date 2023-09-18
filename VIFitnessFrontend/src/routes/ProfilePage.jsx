import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Topbar from "./topbar";
import Sidebar from "./sidebars";
import Dashboard from "./ProfilePage/Dashboard";
import Team from "./ProfilePage/team";
import Invoices from "./ProfilePage/invoices";
import Contacts from "./ProfilePage/Contacts";
import Bar from "./ProfilePage/Bar";
import Form from "./ProfilePage/form";
import Line from "./ProfilePage/line";
import Pie from "./ProfilePage/pie";
import FAQ from "./ProfilePage/faq";
import Geography from "./ProfilePage/Geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./ProfilePage/calendar";
import './styles/profilePage.css' 

function ProfilePage() {
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
            <Routes>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="team" element={<Team />} />
              <Route path="Contacts" element={<Contacts />} />
              <Route path="invoices" element={<Invoices />} />
              <Route path="form" element={<Form />} />
              <Route path="bar" element={<Bar />} />
              <Route path="pie" element={<Pie />} />
              <Route path="line" element={<Line />} />
              <Route path="faq" element={<FAQ />} />
              <Route path="Calendar" element={<Calendar />} />
              <Route path="geography" element={<Geography />} />
            </Routes>
          </main>
          {/* <Outlet /> */}
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
    </>
  );
};

export default ProfilePage;