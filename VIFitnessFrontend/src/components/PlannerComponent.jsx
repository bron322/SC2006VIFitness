import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../components/styles/WorkoutBackground.css";
import Upper from "./styles/photos/UpperBody.jpg";
import Lower from "./styles/photos/LowerBody.jpg";
import Core from "./styles/photos/Core.jpg";
import LowerButton from "./LowerButton";
import UpperButton from "./UpperButton";
import CoreButton from "./CoreButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const BackgroundImages = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const images = [Lower, Upper, Core];

  const texts = ["Lower Body", "Upper Body", "Core"];
  const paths = [
    "/user/workout-lower",
    "/user/workout-upper",
    "/user/workout-core",
  ];
  const part1 = ["Quads", "Chest", "Abs"];
  const part2 = ["Hamstrings", "Biceps", "Obliques"];
  const part3 = ["Glutes", "Shoulders"];
  const part4 = ["Calves", "Lats"];
  const buttons = [<LowerButton />, <UpperButton />, <CoreButton />];

  return (
    <div className="flex h-screen">
      {images.map((image, index) => (
        <div
          key={index}
          className={`background-image ${
            hoveredIndex === index ? "hover-effect" : ""
          }`}
          style={{ backgroundImage: `url(${image})` }}
          onMouseOver={() => setHoveredIndex(index)}
          onMouseOut={() => setHoveredIndex(null)}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-b from-transparent to-black ${
              hoveredIndex === index ? "hover-effect" : ""
            }`}
          ></div>
          <div className="flex flex-col justify-center items-center">
            <Link
              to={paths[index]}
              className="z-10 text-4xl bg-transparent h-1/2"
            >
              {texts[index]}
            </Link>
            <div className="z-10 text-center items-center">
              {buttons[index]}{" "}
            </div>
            <div className="z-10 text-xl text-center bg-transparent">
              {part1[index]}
            </div>
            <div className="z-10 text-xl text-center bg-transparent">
              {part2[index]}
            </div>
            <div className="z-10 text-xl text-center bg-transparent">
              {part3[index]}
            </div>
            <div className="z-10 text-xl text-center bg-transparent">
              {part4[index]}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BackgroundImages;
