import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./routes/Calendar/App.jsx";
import "./routes/Calendar/index.css";
import ContextWrapper from "./routes/Calendar/context/ContextWrapper";

//View imports
import LandingPage from "./routes/landingPage";
import ErrorPage from "./routes/ErrorPage";
import LoginPage from "./routes/LoginPage";
import RegisterPage from "./routes/RegisterPage";
import MacrosPage from "./routes/MacrosPage";
import WorkoutPlannerPage from "./routes/WorkoutPlannerPage";
import WorkoutCorePage from "./routes/WorkoutCorePage";
import WorkoutUpperPage from "./routes/WorkoutUpperPage";
import WorkoutLowerPage from "./routes/WorkoutLowerPage";
import ProfilePage from "./routes/ProfilePage";
import TestPageLebron from "./routes/TestPageLebron";
import TestPageNg from "./routes/TestPageNg";
import Dashboard from "./routes/ProfilePage/Dashboard";
// import Contacts from "./routes/ProfilePage/Contacts";
// import Team from "./routes/ProfilePage/team";
// import Invoices from "./routes/ProfilePage/invoices";
import Form from "./routes/ProfilePage/form";
// import Line from "./routes/ProfilePage/line";
// import Pie from "./routes/ProfilePage/pie";
import FAQ from "./routes/ProfilePage/faq";
// import Geography from "./routes/ProfilePage/Geography";
// import Calendar from "./routes/ProfilePage/calendar";
import Calendar from "./routes/Calendar/App";
import TestPageOscar from "./routes/TestingPageOscar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useMode } from "./routes/theme";
import "./routes/theme";

import TestSignUpLebron from "./routes/TestSignUpLebron";
import ChatGPTTest from "./routes/GetWorkoutPage";
import BarChart from "./components/calorieChartTest/calorie"

//Authorisation related imports
import ProtectedLayout from "./layouts/ProtectedLayout";
import PublicLayout from "./layouts/PublicLayout";
import AuthLayout from "./layouts/AuthLayout";
import TestRoute1 from "./routes/TestRoute1";
import GenerateWorkout from "./routes/GetWorkoutPage";
import LebronPage from "./routes/LebronPage";
import StravaRedirect, {
  loader as stravaLoader,
} from "./routes/StravaRedirect";
import StravaConnectRedirect from "./routes/StravaConnectRedirect";
import StravaPage from "./routes/StravaPage";

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
          {
            path: "testoscar",
            errorElement: <ErrorPage />,
            element: <TestPageOscar />,
          },
          {
            path: "stravaredirect/exchange_token",
            errorElement: <ErrorPage />,
            element: <StravaRedirect />,
            loader: stravaLoader,
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
                index: true,
                element: <Dashboard />,
              },
              // {
              //   path: "contact",
              //   element: <Contacts />,
              // },
              // {
              //   path: "team",
              //   element: <Team />,
              // },
              // {
              //   path: "invoices",
              //   element: <Invoices />,
              // },
              {
                path: "form",
                element: <Form />,
              },
              // {
              //   path: "bar",
              //   element: <Bar />,
              // },
              // {
              //   path: "pie",
              //   element: <Pie />,
              // },
              // {
              //   path: "line",
              //   element: <Line />,
              // },
              {
                path: "faq",
                element: <FAQ />,
              },
              {
                path: "calendar",
                element: <Calendar />,
              },
              // {
              //   path: "geography",
              //   element: <Geography />,
              // },
              {
                path: "macros-tracker",
                element: <MacrosPage />,
              },
              {
                path: "workout-planner",
                element: <WorkoutPlannerPage />,
              },
              {
                path: "workout-lower",
                element: <WorkoutLowerPage />,
              },
              {
                path: "workout-upper",
                element: <WorkoutUpperPage />,
              },
              {
                path: "workout-core",
                element: <WorkoutCorePage />,
              },
              {
                path: "getworkout",
                errorElement: <ErrorPage />,
                element: <GenerateWorkout />,
              },
              {
                path: "strava",
                errorElement: <ErrorPage />,
                element: <StravaPage />,
              },
              {
                path: "testaddworkout",
                errorElement: <ErrorPage />,
                element: <TestPageNg />,
              },
              {
                path: "stravaconnectredirect/exchange_token",
                errorElement: <ErrorPage />,
                element: <StravaConnectRedirect />,
                loader: stravaLoader,
              },
              {
                path: "testchart",
                errorElement: <ErrorPage />,
                element: <BarChart/>,
              },
            ],
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
    path: "/macros",
    errorElement: <ErrorPage />,
    element: <LebronPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextWrapper>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </ContextWrapper>
  </React.StrictMode>
);
