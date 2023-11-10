import React, { Component, useState, useEffect, useContext } from "react";
import "./styles/header.css";
import VILOGO from "./styles/photos/VILOGO.jpg";
import Button from "../components/button";
import { IconButton } from "@mui/material";
import { ColorModeContext, tokens } from "../routes/theme";
import { useTheme } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  // Function to handle the scroll event
  function handleScroll() {
    if (window.scrollY > 1100) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  }

  // Add a scroll event listener to determine when the header becomes sticky
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return function cleanup() {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className={`sticky-header ${isSticky ? "animate" : ""}`}>
        <div className="logo-container">
          <a href="/" className="white-link">
            <img
              className="img"
              src={VILOGO}
              alt="LOGO"
              style={{
                width: "30%",
                height: "30%",
                display: "block",
                overflow: "hidden",
                filter: "invert(100%)",
              }}
            ></img>
          </a>
        </div>
        <div className="login-register-container">
          <Button name="login" />
          <Button name="register" />
          {/* <IconButton onClick={colorMode.toggleColorMode}>
          
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton> */}
        </div>
      </div>
    </>
  );
}

export default Header;
