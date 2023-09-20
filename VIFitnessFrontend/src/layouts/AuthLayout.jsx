import { Await, Outlet, useLoaderData, defer } from "react-router-dom";
import { AuthProvider } from "../hooks/AuthProvider";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";

export default function AuthLayout() {
  return (
    <Suspense fallback={<LinearProgress />}>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </Suspense>
  );
}
