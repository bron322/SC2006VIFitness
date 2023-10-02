import React, { useEffect, useState } from "react";
import BG from "./styles/photos/loginbackground.jpg";
import therock from "./styles/photos/therock.png";
import TextField from "@mui/material/TextField";
import Header from "../components/headerlogin";
import { Link, Form } from "react-router-dom";
import APIDataService from "../services/APIDataService";
import { Toaster, toast } from "react-hot-toast";
import GoogleButton from "../components/socialsButton/GoogleButton";
import StravaButton from "../components/socialsButton/StravaButton";
import { useGoogleLogin } from "@react-oauth/google";
import GoogleAPIService from "../services/GoogleAPIService";
import { useAuth } from "../hooks/AuthProvider";
import StravaAPIService from "../services/StravaAPIService";
import { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import CryptoJS from "crypto-js";
import "./styles/loginpage.css";

export default function LoginPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { googleAuthLogin, login } = useAuth();
  const [disableButton, setDisableButton] = useState(false);

  //tracks value of login form
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  //Google OAuth flow
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await GoogleAPIService.getGoogleData(tokenResponse);
        googleAuthLogin(response.data);
      } catch (e) {
        console.log(e);
        toast.error("Something went wrong. Try again later!");
      }
    },
  });

  //Strava OAuth flow
  const stravaLogin = () => {
    StravaAPIService.redirectAuthorisation();
  };

  //Manual Login Auth flow
  const authenticateUser = async () => {
    let response;

    //Query database for this user
    try {
      response = await APIDataService.getByEmail(data.email);
    } catch (err) {
      console.log(err);
      if (err instanceof AxiosError) {
        toast.error("Something went wrong. Try again later!");
      }
    }

    //when user doesn't exist or when user keys in wrong password
    if (
      response.data === "Null" ||
      response.data.password !==
        CryptoJS.SHA256(data.password).toString(CryptoJS.enc.Base64)
    ) {
      toast.error("Invalid credentials bro");
    } else {
      // if user exist
      login(response.data);
    }
  };

  //check if field is empty
  const checkEmpty = () => {
    if (data.email === "") {
      return setDisableButton(true);
    } else if (data.password === "") {
      return setDisableButton(true);
    } else {
      return setDisableButton(false);
    }
  };

  useEffect(() => {
    checkEmpty();
  }, [data]);

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <Form onSubmit={authenticateUser}>
        <div className="input-container font-semibold">
          <TextField
            id="standard-basic"
            label="EMAIL"
            variant="standard"
            margin="dense"
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>
        <div className="input-container font-semibold">
          <TextField
            id="standard-basic"
            label="PASSWORD"
            variant="standard"
            margin="dense"
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>
        <div className="button-container pt-4">
          <Button
            variant="register"
            size="login"
            type="submit"
            className="login-button"
            disabled={disableButton ? true : false}
          >
            LOG IN
          </Button>
        </div>
      </Form>
    </div>
  );

  return (
    <>
      <Header />
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      <div className="h-full w-full flex items-center justify-center bg-black absolute top-0">
        <div className="h-4/5 w-4/5 bg-logincolor flex items-center justify-center">
          <div className="flex-1 w-full h-full p-4 flex-col items-center justify-center">
            <div className="">
              <div className="pt-20 pl-32 pr-32 h-1/3 w-full flex flex-col items-left justify-between">
                <div className="text-7xl font-sans font-bold mb-4 text-left uppercase">
                  Log In
                </div>
                {isSubmitted ? (
                  <div>User is successfully Logged In</div>
                ) : (
                  renderForm
                )}
              </div>
            </div>
            <div className="flex items-center justify-center pt-2">
              <div className="pr-2">New to our app?</div>
              <Link to={"/register"} className="no-underline text-white">
                REGISTER
              </Link>
            </div>
            <div className="flex items-center justify-center pt-2">
              <div className="divider">
                <span>or</span>
              </div>
            </div>

            {/* Socials button */}
            <div className="flex flex-col items-center justify-center pt-2">
              {/* Google button */}
              <GoogleButton onClick={() => googleLogin()}>
                Login with Google
              </GoogleButton>
              <div id="google-button"></div>

              {/* Strava button */}
              <StravaButton onClick={() => stravaLogin()}>
                Login with Strava
              </StravaButton>
            </div>
          </div>

          <div className="flex-1 w-full h-full">
            <img
              className="img w-full h-full"
              src={BG}
              alt="background"
              style={{
                display: "block",
                overflow: "hidden",
                objectFit: "cover",
              }}
            ></img>
          </div>

          <div></div>
        </div>
      </div>

      <div className="absolute w-1/2 h-[770px] top-20 left-1/3 right-0 bottom-0 pl-24 flex justify-center items-center pointer-events-none">
        <img
          className="img h-[750px] w-[550px]"
          src={therock}
          alt="the_king"
          style={{
            display: "absolute",
            overflow: "hidden",
            objectFit: "cover",
            zIndex: "3",
            pointerEvents: "none",
          }}
        ></img>
      </div>
    </>
  );
}
