import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../components/styles/WorkoutBackground.css";
import Upper from "./styles/photos/UpperBody.jpg";
import Lower from "./styles/photos/LowerBody.jpg";
import Core from "./styles/photos/Core.jpg";
import Upper2 from "./styles/photos/Upper2.jpg";
import Lower2 from "./styles/photos/Lower2.jpg";
import Core2 from "./styles/photos/Core2.jpg";
import LowerButton from './LowerButton';
import UpperButton from './UpperButton';
import CoreButton from './CoreButton';
import { useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext } from "../routes/theme";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useSpring, animated} from "react-spring";         
import { useNavigate } from 'react-router-dom'; 


const BackgroundImages = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const [flip, setFlip] = useState(false)
  
  const props = useSpring({
    to: {opacity: 1},
    from: {opacity: 0},
  });

  const DarkImages = [
    Lower,
    Upper,
    Core,
  ];

  const LightImages = [
    Lower2,
    Upper2,
    Core2,
  ];

const texts = ['Lower Body', 'Upper Body', 'Core'];
const paths = ['/user/workout-lower','/user/workout-upper','/user/workout-core']
const buttons = [<LowerButton/>,<UpperButton/>,<CoreButton/>]

const navigate = useNavigate(); 

const handleClick = (path) => {
  navigate(path); 
};

const getGradientColors = () => {
  if (theme.palette.mode === 'dark') {
    return 'transparent, black';
  } else {
    return 'transparent, #808080';
  }
};

const changeImage = () => {
  if (theme.palette.mode === 'dark') {
    return DarkImages;
  }else{
    return LightImages;
  }
}

return (
  <animated.div className="flex h-screen" style ={props}>
    {changeImage().map((image, index) => (
      <div
        key={index}
        className={`background-image ${hoveredIndex === index ? 'hover-effect' : ''}`}
        style={{ backgroundImage: `url(${image})`}}
        onMouseOver={() => setHoveredIndex(index)}
        onMouseOut={() => setHoveredIndex(null)}
        onClick={() => handleClick(paths[index])}
      >
        <div style={{position: 'absolute', inset: 0, background: `linear-gradient(to bottom, ${getGradientColors()})`}} className={`${hoveredIndex === index ? 'hover-effect' : ''}`}></div>
        <div className="flex flex-col justify-center items-center">
          <Link to={paths[index]} className="z-10 text-4xl bg-transparent h-1/2">
            {texts[index]}
          </Link>
          <div className="z-10 text-center items-center">{buttons[index]} </div>
        </div>
      </div>
    ))}
  </animated.div>
);
};

export default BackgroundImages;
