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
import TestPage from "./routes/TestPageLebron";
import TestPageOscar from "./routes/TestingPageOscar";

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
      {
        path: "profile-page",
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
        ]
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
  {
    path: "/testlebron",
    errorElement: <ErrorPage />,
    element: <TestPage />,
  },
  {
    path: "/testoscar",
    errorElement: <ErrorPage />,
    element: <TestPageOscar />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}>
    </RouterProvider>
  </React.StrictMode>
);
