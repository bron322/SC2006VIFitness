import React from 'react';
import Core from "./styles/photos/Core.jpg";
import Abs from "./styles/photos/Abs.png";
import Oblique from "./styles/photos/Obliques.png";
import MuscleCard from './MuscleCard';

function CoreComponent(){
    return(
        <>
        <div className="flex">
            <div className="sticky top-0 flex-none w-1/3 h-screen">
                <img src={Core} className="h-screen w-full object-cover"/>
            </div>
            <div className="flex-grow px-24 pt-10 pb-10">
                <div className="grid grid-cols-2 grid-rows-3 gap-x-24 gap-y-20 overflow-y-auto">

                    {/* Card 1 */}
                    <div className="flex justify-center">
                        <MuscleCard
                        img={Oblique}
                        title="Obliques"
                        description="nice"
                        />
                    </div>

                    {/* Card 2 */}
                    <div className="flex justify-center">
                        <MuscleCard
                        img={Abs}
                        title="Abs"
                        description="nice"
                        />
                    </div>

                </div>
            </div>
        </div>
        </>
    )
}

export default CoreComponent;