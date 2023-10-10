import React from 'react';
import Upper from "./styles/photos/UpperBody.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const images = [Upper, Upper, Upper, Upper];
const descriptions = ["Bench Press", "Lat Pulldown", "Pull Up", "Dumbbell Curl"];

function LeftComponent() {
    return (
        <div className="flex w-1/3 h-screen relative">
            <img src={Upper} className="h-full w-full object-cover" />

            <div className="absolute top-1/3 left-0 right-0 text-center font-bold text-xl">LOWER BODY EXERCISES</div>

            <div className="absolute top-4 left-4">
                <FontAwesomeIcon icon={faArrowLeft} />
            </div>

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
                    <div className="absolute bottom-4 text-center w-full font-bold text-xl">{descriptions[index]}</div>
                </div>
            ))}
        </div>
    );
}

function UpperBodyComponent() {
    return (
        <div className="flex h-screen">
            <LeftComponent />
            <RightComponent />
        </div>
    );
}

export default UpperBodyComponent;