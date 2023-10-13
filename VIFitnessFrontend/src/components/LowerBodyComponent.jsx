import React from 'react';
import Lower from "./styles/photos/LowerBody.jpg";
import Calves from "./styles/photos/Calves.png";
import Glutes from "./styles/photos/Glutes.png";
import Hamstring from "./styles/photos/Hamstring.jpg";
import Quads from "./styles/photos/Quads.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const images = [Lower, Lower, Lower, Lower];
const descriptions = ["Squat", "Deadlift", "Lunge", "Goblet Squat"];

function LeftComponent() {
    return (
        <div className="flex w-1/3 h-screen relative">
            <img src={Lower} className="h-full w-full object-cover" />

            <div className="absolute top-1/3 left-0 right-0 text-center font-bold text-xl">LOWER BODY EXERCISES</div>

            <div className="absolute top-4 left-4">
                <FontAwesomeIcon icon={faArrowLeft} />
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black"></div>
        </div>        
    );
}

function RightComponent() {
    return (
        <div className="w-2/3 h-screen flex flex-wrap">
            {images.map((image, index) => (
                <div key={index} className="w-1/2 h-1/2 flex flex-col justify-center items-center relative">
                    <img src={image} className="object-cover w-full h-3/4" alt={`Image ${index + 1}`} />
                    <div className="absolute bottom-4 text-center w-full font-bold text-xl">{descriptions[index]}</div>
                </div>
            ))}
        </div>
    );
}

function LowerBodyComponent() {
    return (
        <>
        <div className="flex">
            <div className="sticky top-0 flex-none w-1/3 h-screen">
                <img src={Lower} className="h-screen w-full object-cover"/>
            </div>
            <div className="flex-grow px-24 pt-10">
                <div className="grid grid-cols-2 grid-rows-3 gap-x-24 gap-y-20 overflow-y-auto">
                    {/* Card 1 */}
                    <div className="bg-white p-4 rounded-lg shadow-md flex justify-center items-center">
                        <img src={Quads} className="h-full w-full object-contain object-center"/>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white p-4 rounded-lg shadow-md flex justify-center items-center">
                        <img src={Hamstring} className="h-full w-full object-contain object-center"/>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white p-4 rounded-lg shadow-md flex justify-center items-center">
                        <img src={Calves} className="h-full w-full object-contain object-center"/>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-white p-4 rounded-lg shadow-md flex justify-center items-center">
                        <img src={Glutes} className="h-full w-full object-contain object-center"/>
                    </div>

                    {/* Card 5 */}
                    <div className="bg-white p-4 rounded-lg shadow-md flex justify-center items-center">
                        <img src="https://i2-prod.dailystar.co.uk/incoming/article27469447.ece/ALTERNATES/s615b/0_JS271931188.jpg" className="h-full w-full object-contain object-center"/>
                    </div>

                    {/* Card 6 */}
                    <div className="bg-white p-4 rounded-lg shadow-md flex justify-center items-center">
                        <img src="https://www.greatestphysiques.com/wp-content/uploads/2016/09/Arnold-Schwarzenegger-1r4.jpg" className="h-full w-full object-contain object-center"/>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}


export default LowerBodyComponent;
