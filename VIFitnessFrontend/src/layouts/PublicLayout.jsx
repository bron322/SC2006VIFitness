import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";

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

  return (
    <>
      <h1>This is Unprotected Layout</h1>
      <div id="signInDiv"></div>
      <button onClick={SignInAction}>Sign in</button>
      <Outlet />
    </>
  );
}
