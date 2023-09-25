import { Outlet } from "react-router-dom";
import { AuthProvider } from "../hooks/AuthProvider";
import { Suspense } from "react";
import { LinearProgress, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../routes/theme";

export default function AuthLayout() {
  const [theme, colorMode] = useMode();

  return (
    <Suspense fallback={<LinearProgress />}>
      <AuthProvider>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <Outlet />
          </ThemeProvider>
        </ColorModeContext.Provider>
      </AuthProvider>
    </Suspense>
  );
}
