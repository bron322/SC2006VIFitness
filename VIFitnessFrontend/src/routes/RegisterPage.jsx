import React, { useEffect, useState, useContext } from "react";
import "./styles/loginpage.css";
import BG from "./styles/photos/loginbackground.jpg";
import theking from "./styles/photos/theking.png";
import lebronwannabe from "./styles/photos/lebronwannabe.png";
import TextField from "@mui/material/TextField";
import Header from "../components/headerlogin";
import { Link, Form } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { EmailVerificationButton } from "@/components/EmailVerificationButton";
import { useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../routes/theme";

export default function RegisterPage() {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    age: "",
    weight: "",
    height: "",
  });

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <Form>
        <div className="input-container font-semibold flex ">
          <TextField
            id="standard-basic"
            label="USERNAME"
            variant="standard"
            margin="dense"
            onChange={(e) => setData({ ...data, username: e.target.value })}
            InputLabelProps={{
              style: { color: "black" },
            }}
          />
          {renderErrorMessage("uname")}
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
          {renderErrorMessage("email")}
          <TextField
            id="standard-basic"
            label="PASSWORD"
            variant="standard"
            margin="dense"
            onChange={(e) => setData({ ...data, password: e.target.value })}
            InputLabelProps={{
              style: { color: "black" },
            }}
          />
          {renderErrorMessage("pass")}
          <div className="gap-[20px] font-semibold flex ">
            <TextField
              id="standard-basic"
              label="AGE"
              variant="standard"
              margin="dense"
              onChange={(e) => setData({ ...data, age: e.target.value })}
              InputLabelProps={{
                style: { color: "black" },
              }}
            />
            <TextField
              id="standard-basic"
              label="WEIGHT (KG)"
              variant="standard"
              margin="dense"
              onChange={(e) => setData({ ...data, weight: e.target.value })}
              InputLabelProps={{
                style: { color: "black" },
              }}
            />
            <TextField
              id="standard-basic"
              label="HEIGHT (CM)"
              variant="standard"
              margin="dense"
              onChange={(e) => setData({ ...data, height: e.target.value })}
              InputLabelProps={{
                style: { color: "black" },
              }}
            />
          </div>
        </div>
        <div className="button-container pt-5">
          <EmailVerificationButton data={data} />
        </div>
      </Form>
    </div>
  );

  return (
    <>
      <Header />
      <div className="h-full w-full flex items-center justify-center bg-black absolute top-0">
        <div className="h-4/5 w-4/5 bg-logincolor flex items-center justify-center">
          <div className="flex-1 w-full h-full p-4 flex-col items-center justify-center">
            <div className="">
              <div className="pt-12 pl-32 pr-32 h-1/3 w-full flex flex-col items-left justify-between">
                <div className="text-7xl font-sans font-bold mb-4 text-left uppercase">
                  Register
                </div>
                {isSubmitted ? (
                  <div>User is successfully Registered</div>
                ) : (
                  renderForm
                )}
              </div>
            </div>
            <div className="flex items-center justify-center pt-2">
              <div className="pr-2">Already a member?</div>
              <Link to={"/login"} className="no-underline text-white">
                LOGIN
              </Link>
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
            <div className="absolute bottom-5 right-48 w-1/2 h-8/12 pointer-events-none">
              {theme.palette.mode === "dark" ? (
                <img
                  className="img h-full w-11/12"
                  src={lebronwannabe}
                  alt="lebronwannabe"
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
                  className="img h-[800px] w-full"
                  src={theking}
                  alt="theking"
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
          </div>

          <div></div>
        </div>
      </div>
    </>
  );
}
