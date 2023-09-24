import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

//View imports
import LandingPage from "./routes/landingPage";
import ErrorPage from "./routes/ErrorPage";
import LoginPage from "./routes/LoginPage";
import RegisterPage from "./routes/RegisterPage";
import MacrosPage from "./routes/MacrosPage";
import WorkoutPlannerPage from "./routes/WorkoutPlannerPage";
import ProfilePage from "./routes/ProfilePage";
import TestPageLebron from "./routes/TestPageLebron";
import Dashboard from "./routes/ProfilePage/Dashboard";
import Contacts from "./routes/ProfilePage/Contacts";
import Team from "./routes/ProfilePage/team";
import Invoices from "./routes/ProfilePage/invoices";
import Bar from "./routes/ProfilePage/Bar";
import Form from "./routes/ProfilePage/form";
import Line from "./routes/ProfilePage/line";
import Pie from "./routes/ProfilePage/pie";
import FAQ from "./routes/ProfilePage/faq";
import Geography from "./routes/ProfilePage/Geography";
import Calendar from "./routes/ProfilePage/calendar";
import TestPageOscar from "./routes/TestingPageOscar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useMode } from "./routes/theme";
import "./routes/theme";

import TestSignUpLebron from "./routes/TestSignUpLebron";
import ChatGPTTest from "./routes/GetWorkoutPage";

//Authorisation related imports
import ProtectedLayout from "./layouts/ProtectedLayout";
import PublicLayout from "./layouts/PublicLayout";
import AuthLayout from "./layouts/AuthLayout";
import TestRoute1 from "./routes/TestRoute1";
import GenerateWorkout from "./routes/GetWorkoutPage";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <AuthLayout />,
    children: [
      {
        element: <PublicLayout />,
        children: [
          {
            index: true,
            element: <LandingPage />,
          },
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "register",
            element: <RegisterPage />,
          },
        ],
      },
      {
        element: <ProtectedLayout />,
        children: [
          {
            path: "user",
            element: <ProfilePage />,
            children: [
              {
                path: "dashboard",
                element: <Dashboard />,
              },
              {
                path: "contact",
                element: <Contacts />,
              },
              {
                path: "team",
                element: <Team />,
              },
              {
                path: "invoices",
                element: <Invoices />,
              },
              {
                path: "form",
                element: <Form />,
              },
              {
                path: "bar",
                element: <Bar />,
              },
              {
                path: "pie",
                element: <Pie />,
              },
              {
                path: "line",
                element: <Line />,
              },
              {
                path: "faq",
                element: <FAQ />,
              },
              {
                path: "calendar",
                element: <Calendar />,
              },
              {
                path: "geography",
                element: <Geography />,
              },
            ],
          },
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
    ],
  },
  {
    path: "/testlogin",
    errorElement: <ErrorPage />,
    element: <TestPageLebron />,
  },
  {
    path: "/testregister",
    errorElement: <ErrorPage />,
    element: <TestSignUpLebron />,
  },
  {
    path: "/testoscar",
    errorElement: <ErrorPage />,
    element: <TestPageOscar />,
  },
  {
    path: "/getworkout",
    errorElement: <ErrorPage />,
    element: <GenerateWorkout />,
  }
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <RouterProvider router={router}>
      </RouterProvider>
  </React.StrictMode>
);
