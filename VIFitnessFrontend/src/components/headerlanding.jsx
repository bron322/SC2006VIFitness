import React, { Component, useState, useEffect, useContext } from "react";
import "./styles/header.css";
import Button from "../components/button";
import { IconButton } from "@mui/material";
import { ColorModeContext, tokens } from "../routes/theme";
import { useTheme } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Logo from "/VIlogo.png";
import { Link } from "react-router-dom";

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
        <div className="logo-container w-fit">
          <img
            className="img"
            src={Logo}
            alt="LOGO"
            style={{
              width: "100%",
              height: "100%",
              filter: "invert(100%)",
            }}
          />
        </div>
        <div className="w-full">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className="text-neutral-400 hover:text-neutral-200"
                  style={{ backgroundColor: "black" }}
                >
                  Home
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-neutral-950 text-neutral-300 border-neutral-900 border-0">
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3 bg-gradient-to-r from-neutral-700 to-neutral-900 rounded-md">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          to="/"
                        >
                          <img className="h-[40px] w-[60px]" src={Logo} />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            VI Fitness
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            An integrated and comprehensive fitness application.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li className="hover:bg-neutral-800 rounded-md transition-colors">
                      <NavigationMenuLink asChild>
                        <a href="#macros">
                          <div className="text-md font-bold leading-none p-1 pl-2">
                            Macros Tracker
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-neutral-400 p-1 pl-2">
                            A user friendly nutritional tool with dynamic
                            features
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li className="hover:bg-neutral-800 rounded-md transition-colors">
                      <NavigationMenuLink asChild>
                        <a href="#workout-planner">
                          <div className="text-md font-bold leading-none p-1 pl-2">
                            Workout Planner
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-neutral-400 p-1 pl-2">
                            Generate personalised workouts with a comprehensive
                            exercise library
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li className="hover:bg-neutral-800 rounded-md transition-colors">
                      <NavigationMenuLink asChild>
                        <a href="#strava-integration">
                          <div className="text-md font-bold leading-none p-1 pl-2">
                            Strava Integration
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-neutral-400 p-1 pl-2">
                            Integrated with your favourite sport tracking app
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className="text-neutral-400 hover:text-neutral-200 "
                  style={{ backgroundColor: "black" }}
                >
                  Documentations
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-neutral-950 text-neutral-300 border-neutral-900 border-0">
                  <ul className="grid grid-cols-1 gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-1 ">
                    <li className="hover:bg-neutral-800 rounded-md transition-colors">
                      <NavigationMenuLink asChild>
                        <a
                          href="https://sc-2006-vi-fitness.vercel.app/docs/guides/introduction/"
                          target="_blank"
                        >
                          <div className="text-md font-bold leading-none p-1 pl-2">
                            User Manual (For users)
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-neutral-400 p-1 pl-2">
                            Learn more about VI Fitness' core functionalities
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>

                    <li className="hover:bg-neutral-800 rounded-md transition-colors">
                      <NavigationMenuLink asChild>
                        <a
                          href="https://sc-2006-vi-fitness.vercel.app/docs/developerapi/getting-started/"
                          target="_blank"
                        >
                          <div className="text-md font-bold leading-none p-1 pl-2">
                            API Reference (For developers)
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-neutral-400 p-1 pl-2">
                            Develop with VI Fitness' RESTful API endpoints
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
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
