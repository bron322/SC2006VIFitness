import React from 'react';
import Lower from "./styles/photos/LowerBody.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight} from '@fortawesome/free-solid-svg-icons';

const images = [Lower, Lower, Lower, Lower];
const descriptions = ["Squat", "Deadlift", "Lunge", "Goblet Squat"];

function LeftComponent() {
    return (
        <div className="flex w-1/3 h-screen relative">
            <img src={Lower} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black"></div>
        </div>        
    );
  };

function RightComponent() {
    return (
        <div className="w-2/3 h-screen flex flex-wrap">
            {images.map((image, index) => (
                <div key={index} className="w-1/2 h-1/2 flex flex-col justify-center items-center relative">
                    <img src={image} className="object-cover w-full h-3/4" alt={`Image ${index + 1}`} />
                    <div className="absolute bottom-4 text-center w-full">{descriptions[index]}</div>
                </div>
            ))}
        </div>
    );
}

function LowerBodyComponent() {
    return (
        <div className="flex h-screen">
            <LeftComponent />
            <RightComponent />
        </div>
    );
}


export default LowerBodyComponent;
