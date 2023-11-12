import React from 'react';
import Core from "./styles/photos/Core.jpg";
import Abs from "./styles/photos/Abs.png";
import LowerBack from "./styles/photos/Lower Back.jpeg";
import Oblique from "./styles/photos/Obliques.png";
import MuscleCard from './MuscleCard';
import { Link } from 'react-router-dom';

function CoreComponent(){
    return(
        <>
        <div className="flex">
            <div className="sticky top-0 flex-none w-1/3 h-screen">
                <Link to="/user/workout-planner">
                    <img src={Core} className="h-screen w-full object-cover"
                    alt="Workout Planner"/>
                </Link>
            </div>
            <div className="flex-grow px-24 pt-10 pb-10">
                <div className="grid grid-cols-2 grid-rows-3 gap-x-24 gap-y-20 overflow-y-auto">

                    {/* Card 1 */}
                    <div className="flex justify-center">
                        <MuscleCard
                        img={Abs}
                        title="Abdominals"
                        description=""
                        />
                    </div>

                    {/* Card 2 */}
                    <div className="flex justify-center">
                        <MuscleCard
                        img={LowerBack}
                        title="Lower_Back"
                        description=""
                        />
                    </div>

                </div>
            </div>
        </div>
        </>
    )
}

export default CoreComponent;