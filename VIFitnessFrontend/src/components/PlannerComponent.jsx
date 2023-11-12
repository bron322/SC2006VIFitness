import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../components/styles/WorkoutBackground.css";
import Upper from "./styles/photos/UpperBody.jpg";
import Lower from "./styles/photos/LowerBody.jpg";
import Core from "./styles/photos/Core.jpg";
import LowerButton from './LowerButton';
import UpperButton from './UpperButton';
import CoreButton from './CoreButton';
import { useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext } from "../routes/theme";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'


const BackgroundImages = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const images = [
    Lower,
    Upper,
    Core,
  ];

const texts = ['Lower Body', 'Upper Body', 'Core'];
const paths = ['/user/workout-lower','/user/workout-upper','/user/workout-core']
const buttons = [<LowerButton/>,<UpperButton/>,<CoreButton/>]

  return (
    <div className="flex h-screen">
      {images.map((image, index) => (
        <div
          key={index}
          className="background-image"
          style={{ backgroundImage: `url(${image})` }}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
          <div className="flex flex-col justify-center items-center">
            <Link to={paths[index]} className="z-10 text-4xl bg-transparent h-1/2">
              {texts[index]}
            </Link>
            <div className="z-10 text-center items-center">{buttons[index]} </div> 
          </div>
        </div>
      ))}
    </div>
  );
};

export default BackgroundImages;
