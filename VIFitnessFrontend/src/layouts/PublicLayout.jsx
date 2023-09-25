import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import StravaAPIService from "../services/StravaAPIService";
import "./styles/PublicLayout.css";

export default function PublicLayout() {
  const { user, login } = useAuth();

  if (user) {
    return <Navigate to="/user" />;
  }

  const SignInAction = () => {
    login(true);
  };

  //Callback function after login with google
  const handleCallbackResponse = (response) => {
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    login(userObject);
  };

  useEffect(() => {
    //Call Google OAuth
    window.google.accounts.id.initialize({
      client_id:
        "1045036706852-09cqq9sthot4lphn50828qc5cmlkqdqk.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    //Render Login with Google button
    window.google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {
        theme: "outline",
        size: "large",
      }
    );

    //Google login prompt
    window.google.accounts.id.prompt();
  }, []);

  const StravaSignin = () => {
    StravaAPIService.redirectAuthorisation();
  };

  return (
    <>
      <h1>This is Unprotected Layout</h1>
      <div className="signin-button-wrapper">
        {/* Google Sign in button */}
        <div id="signInDiv"></div>

        {/* VI Fitness Sign in button */}
        <div className="button-wrapper">
          <button className="button-82-pushable" onClick={SignInAction}>
            <span className="button-82-shadow"></span>
            <span className="button-82-edge"></span>
            <span className="button-82-front button-text">
              Sign in with VI Fitness
            </span>
          </button>
        </div>

        {/* Strava Sign in button */}
        <div className="button-wrapper">
          <button className="button-82-pushable" onClick={StravaSignin}>
            <span className="button-82-shadow"></span>
            <span className="button-82-edge"></span>
            <span className="button-82-front button-text">
              Sign in with Strava
            </span>
          </button>
        </div>
      </div>

      <Outlet />
    </>
  );
}
