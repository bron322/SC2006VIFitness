import React, { useState } from 'react';
import { useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext } from "../routes/theme";
import Upper from "./styles/photos/UpperBody.jpg";
import Upper2 from "./styles/photos/Upper2.jpg";
import Biceps from "./styles/photos/Biceps.png";
import Chest from "./styles/photos/Chest.png";
import Lats from "./styles/photos/Lats.png";
import Shoulders from "./styles/photos/Shoulders.png";
import Triceps from "./styles/photos/Triceps.png";
import Forearms from "./styles/photos/Forearms.jpeg";
import MiddleBack from "./styles/photos/Middle Back.jpeg";
import MuscleCard from './MuscleCard';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import "./styles/BodyComponent.css";

function UpperBodyComponent() {
    const [isHovered, setIsHovered] = useState(false);
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);

    const changeImage = () => {
        if (theme.palette.mode === 'dark') {
          return Upper;
        }else{
          return Upper2;
        }
      }

    return (
        <>
            <div className="flex">
                <div className={`sticky sticky-container top-0 flex-none w-1/3 h-screen cssanimation fadeInRight ${isHovered ? 'hover-return' : ''}`}
                    onMouseOver={() => setIsHovered(true)}
                    onMouseOut={() => setIsHovered(false)}
                >
                    <Link to="/user/workout-planner">
                        <img src={changeImage()} className="h-screen w-full object-cover"
                            alt="Workout Planner"
                        />
                        {isHovered && (
                        <p className="z-10 text-4xl bg-transparent h-1/5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <FontAwesomeIcon icon={faArrowLeft} /> Return
                        </p>
                        )}
                    </Link>
                </div>
                <div className="flex-grow px-24">
                    <div className="grid grid-cols-2 grid-rows-3 gap-x-24 gap-y-20 pt-10 pb-10 overflow-y-auto">

                        {/* Card 1 */}
                        <div className="flex justify-center cssanimation sequence flip">
                            <MuscleCard
                                img={Biceps}
                                title="Biceps"
                                description=""
                            />
                        </div>

                        {/* Card 2 */}
                        <div className="flex justify-center cssanimation sequence flip">
                            <MuscleCard
                                img={Chest}
                                title="Chest"
                                description=""
                            />
                        </div>

                        {/* Card 3 */}
                        <div className="flex justify-center cssanimation sequence flip">
                            <MuscleCard
                                img={Forearms}
                                title="Forearms"
                                description=""
                            />
                        </div>

                        {/* Card 4 */}
                        <div className="flex justify-center cssanimation sequence flip">
                            <MuscleCard
                                img={Lats}
                                title="Lats"
                                description=""
                            />
                        </div>

                        {/* Card 5 */}
                        <div className="flex justify-center cssanimation sequence flip">
                            <MuscleCard
                                img={MiddleBack}
                                title="Middle_Back"
                                description=""
                            />
                        </div>

                        {/* Card 6 */}
                        <div className="flex justify-center cssanimation sequence flip">
                            <MuscleCard
                                img={Triceps}
                                title="Triceps"
                                description=""
                            />
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default UpperBodyComponent;