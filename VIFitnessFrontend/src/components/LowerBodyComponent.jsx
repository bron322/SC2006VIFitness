import React from 'react';
import Lower from "./styles/photos/LowerBody.jpg";
import Calves from "./styles/photos/Calves.png";
import Glutes from "./styles/photos/Glutes.png";
import Hamstring from "./styles/photos/Hamstring.jpg";
import Quads from "./styles/photos/Quads.png";
import MuscleCard from './MuscleCard';

function LowerBodyComponent() { 
    return (
        <>
        <div className="flex">
            <div className="sticky top-0 flex-none w-1/3 h-screen">
                <img src={Lower} className="h-screen w-full object-cover"/>
            </div>
            <div className="flex-grow px-24 pt-10 pb-10">
                <div className="grid grid-cols-2 grid-rows-3 gap-x-24 gap-y-20 overflow-y-auto">

                    {/* Card 1 */}
                    <div className="flex justify-center">
                        <MuscleCard
                        img={Quads}
                        title="Quads"
                        description="nice"
                        />
                    </div>

                    {/* Card 2 */}
                    <div className="flex justify-center">
                        <MuscleCard
                        img={Hamstring}
                        title="Hamstrings"
                        description="123"
                        />
                    </div>

                    {/* Card 3 */}
                    <div className="flex justify-center">
                        <MuscleCard
                        img={Calves}
                        title="Calves"
                        description="123"
                        />
                    </div>

                    {/* Card 4 */}
                    <div className="flex justify-center">
                        <MuscleCard
                        img={Glutes}
                        title="Glutes"
                        description="123"
                        />
                    </div>

                    {/* Card 5 */}
                    <div className="flex justify-center">
                        <MuscleCard
                        img="https://i2-prod.dailystar.co.uk/incoming/article27469447.ece/ALTERNATES/s615b/0_JS271931188.jpg"
                        title="Hell Yeah"
                        description="123"
                        />
                    </div>

                    {/* Card 6 */}
                    <div className="flex justify-center">
                        <MuscleCard
                        img="https://www.greatestphysiques.com/wp-content/uploads/2016/09/Arnold-Schwarzenegger-1r4.jpg"
                        title="Nice"
                        description="123"
                        />
                    </div>

                </div>
            </div>
        </div>
        </>
    );
}

export default LowerBodyComponent;
