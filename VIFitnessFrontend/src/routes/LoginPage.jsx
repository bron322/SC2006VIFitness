import React, { useState } from "react";
import './styles/loginpage.css'
import BG from './styles/photos/loginbackground.jpg'
import therock from './styles/photos/therock.png'
import theking from './styles/photos/theking.png'
import TextField from '@mui/material/TextField';
import Header from "../components/headerlogin";
import { Link } from "react-router-dom";

export default function LoginPage() {

  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info
  const database = [
    {
      username: "user1",
      password: "pass1"
    },
    {
      username: "user2",
      password: "pass2"
    }
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container font-semibold">
          {/* <label className="text-gray-500">USERNAME</label>
          <input className="bg-logincolor" type="text" name="uname" required /> */}
          <TextField id="standard-basic" label="USERNAME" variant="standard" margin="dense"/>
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container font-semibold">
          {/* <label className="text-gray-500">PASSWORD</label>
          <input className="bg-logincolor" type="password" name="pass" required /> */}
          <TextField id="standard-basic" label="PASSWORD" variant="standard" margin="dense"/>
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container pt-5">
          <input type="submit" value="LOG IN" style={{ width: '90%'}}/>
        </div>
      </form>
    </div>
  );

  return (
    <>
      <Header/>
      <div className="h-[770px] flex items-center justify-center bg-black">
        <div className="h-4/5 w-4/5 bg-logincolor flex items-center justify-center"> 
          <div className="flex-1 w-full h-full p-4 flex-col items-center justify-center"> 

          <div className="">
              <div className="pt-24 pl-32 pr-32 h-1/3 w-full flex flex-col items-left justify-between">
                <div className="text-7xl font-sans font-bold mb-4 text-left uppercase">Log In</div>
                  {isSubmitted ? (
                    <div>User is successfully Logged In</div>
                  ) : (
                    renderForm
                  )}
                </div>
              </div>
              <div className="flex items-center justify-center pt-2">
                  <div className="pr-2">New to our app?</div>
                  <Link to={"/register"} className='no-underline text-white'>
                    REGISTER
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
                  objectFit: "cover" 
                }}
              ></img>
            </div>

            <div>
              
            </div>
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
