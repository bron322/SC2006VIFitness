import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import LandingPage from "./routes/landingPage";
import ErrorPage from "./routes/ErrorPage";
import LoginPage from "./routes/LoginPage";
import UserPage from "./routes/UserPage";
import MacrosPage from "./routes/MacrosPage";
import WorkoutPlannerPage from "./routes/WorkoutPlannerPage";
import ProfilePage from "./routes/ProfilePage";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <LandingPage />,
  },
  {
    path: "/login",
    errorElement: <ErrorPage />,
    element: <LoginPage />,
  },
  {
    path: "/user",
    errorElement: <ErrorPage />,
    element: <UserPage />,
    children: [
      { index: true, element: <ProfilePage /> },
      {
        path: "macros-tracker",
        element: <MacrosPage />,
      },
      {
        path: "workout-planner",
        element: <WorkoutPlannerPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);