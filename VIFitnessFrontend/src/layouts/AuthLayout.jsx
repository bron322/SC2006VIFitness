import { Outlet } from "react-router-dom";
import { AuthProvider } from "../hooks/AuthProvider";
import { Suspense } from "react";
import { LinearProgress, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../routes/theme";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function AuthLayout() {
  const [theme, colorMode] = useMode();

  return (
    <Suspense fallback={<LinearProgress />}>
      <AuthProvider>
        <GoogleOAuthProvider clientId="1045036706852-09cqq9sthot4lphn50828qc5cmlkqdqk.apps.googleusercontent.com">
          <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
              <Outlet />
            </ThemeProvider>
          </ColorModeContext.Provider>
        </GoogleOAuthProvider>
      </AuthProvider>
    </Suspense>
  );
}
