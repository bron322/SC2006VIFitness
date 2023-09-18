import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import LandingPage from "./routes/landingPage";
import ErrorPage from "./routes/ErrorPage";
import LoginPage from "./routes/LoginPage";
import RegisterPage from "./routes/RegisterPage";
import UserPage from "./routes/UserPage";
import MacrosPage from "./routes/MacrosPage";
import WorkoutPlannerPage from "./routes/WorkoutPlannerPage";
import ProfilePage from "./routes/ProfilePage";
import TestPageLebron from "./routes/TestPageLebron";
import TestPageOscar from "./routes/TestingPageOscar";
import TestSignUpLebron from "./routes/TestSignUpLebron";
import {Toaster} from 'react-hot-toast'

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
    path: "/register",
    errorElement: <ErrorPage />,
    element: <RegisterPage />,
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
  {
    path: "/testlogin",
    errorElement: <ErrorPage />,
    element: <TestPageLebron />,
  },
  {
    path: "/testoscar",
    errorElement: <ErrorPage />,
    element: <TestPageOscar />,
  },
  {
    path: "/testregister",
    errorElement: <ErrorPage />,
    element: <TestSignUpLebron />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
