import React, { useEffect, useState, useContext } from "react";
import BG from "./styles/photos/loginbackground.jpg";
import therock from "./styles/photos/therock.png";
import ggez from "./styles/photos/ggez.png";
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
import { useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../routes/theme";
import { ring } from "ldrs";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog";

export default function LoginPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { googleAuthLogin, login } = useAuth();
  const [disableButton, setDisableButton] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [isLoading, setIsLoading] = useState(false);
  ring.register();
  //tracks value of login form
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  //Google OAuth flow
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setIsLoading(true);
        const response = await GoogleAPIService.getGoogleData(tokenResponse);
        googleAuthLogin(response.data);
      } catch (e) {
        console.log(e);
        toast.error("Something went wrong. Try again later!");
      }
    },
    onError: () => {
      setIsLoading(false);
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
      setIsLoading(true);
      response = await APIDataService.getByEmail(data.email);
    } catch (err) {
      console.log(err);
      if (err instanceof AxiosError) {
        toast.error("Something went wrong. Try again later!");
      }
      setIsLoading(false);
    }

    //when user doesn't exist or when user keys in wrong password
    if (
      response.data === "Null" ||
      response.data.password !==
        CryptoJS.SHA256(data.password).toString(CryptoJS.enc.Base64)
    ) {
      toast.error("Invalid credentials");
      setTimeout(setIsLoading, 1500, false);
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

  const handleDialogOpen = () => {};

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
            InputLabelProps={{
              style: { color: "black" },
            }}
          />
        </div>
        <div className="input-container">
          <TextField
            id="standard-basic"
            label="PASSWORD"
            variant="standard"
            margin="dense"
            color="secondary"
            type={showPassword ? "text" : "password"}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    color="secondary"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            InputLabelProps={{
              style: { color: "black" },
            }}
          />
        </div>
        <div className="forgotten-wrapper flex justify-end">
          <Link to={"/forgot-password"}>
            <span className="text-sm text-cyan-800 hover:text-cyan-600">
              Forget Password?
            </span>
          </Link>
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
      <Dialog open={isLoading} onOpenChange={handleDialogOpen}>
        <DialogOverlay>
          <div className="w-screen h-screen flex justify-center items-center">
            <l-ring
              size="40"
              stroke="5"
              bg-opacity="0"
              speed="3"
              color="#0e548a"
            ></l-ring>
          </div>
        </DialogOverlay>
      </Dialog>
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
              <GoogleButton
                onClick={() => {
                  setIsLoading(true);
                  googleLogin();
                }}
              >
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

      <div className="absolute w-1/2 h-8/12 top-20 left-1/3 right-0 bottom-0 pl-24 flex justify-center items-center pointer-events-none">
        {theme.palette.mode === "dark" ? (
          <img
            className="img h-full w-9/12"
            src={therock}
            alt="therock"
            style={{
              display: "absolute",
              overflow: "hidden",
              objectFit: "cover",
              zIndex: "3",
              pointerEvents: "none",
            }}
          />
        ) : (
          <img
            className="img h-full w-9/12"
            src={ggez}
            alt="therock"
            style={{
              display: "absolute",
              overflow: "hidden",
              objectFit: "cover",
              zIndex: "3",
              pointerEvents: "none",
            }}
          />
        )}
      </div>
    </>
  );
}
