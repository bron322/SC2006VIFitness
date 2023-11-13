import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import StravaAPIService from "../services/StravaAPIService";
import { useEffect, useState } from "react";
import { MyProSidebarProvider } from "@/components/sidebarContext";

export default function ProtectedLayout() {
  const { user, logout } = useAuth();
  const [athleteData, setAthleteData] = useState({});
  const [isStrava, setIsStrava] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = "auto";
    if (user.hasOwnProperty("strava_data")) {
      setIsStrava(true);
    }
  });

  if (!user) {
    console.log("Unauthorised");
    return <Navigate to="/" />;
  }

  const SignoutAction = () => {
    logout();
  };

  const GetAthleteData = async () => {
    if (isStrava) {
      try {
        const response = await StravaAPIService.getAthleteData(
          user.strava_data
        );
        console.log(response.data);
        setAthleteData(response.data);
      } catch (e) {
        console.log(e);
      }
    } else {
      setShowError(true);
    }
  };

  return (
    <>
      {/* <h1>This is Protected Layout</h1>
      {user.name ? <h1>Hi! {user.name}</h1> : null}
      {user.strava_data ? (
        <h1>Hi! {user.strava_data.athlete.username}</h1>
      ) : null}
      <button onClick={SignoutAction}>Sign out</button>
      <button onClick={GetAthleteData}>Get Strava data</button>
      <button onClick={() => console.log(user)}>test</button>
      {Object.keys(athleteData).length !== 0 ? (
        <p>
          Your total running distance recorded is:{" "}
          {athleteData.all_run_totals.distance}m
        </p>
      ) : null}
      {showError ? <p>Login to Strava to retrieve athlete data</p> : null} */}

      <Outlet />
    </>
  );
}
