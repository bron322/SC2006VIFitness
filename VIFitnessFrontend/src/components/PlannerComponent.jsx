import React from 'react';
import "../components/styles/WorkoutBackground.css"; 
import Upper from "./styles/photos/UpperBody.jpg";
import Lower from "./styles/photos/LowerBody.jpg";
import Core from "./styles/photos/Core.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight} from '@fortawesome/free-solid-svg-icons'


const BackgroundImages = () => {
  const images = [
    Lower, 
    Upper,
    Core,
  ];

const texts = ['Lower Body', 'Upper Body', 'Core'];

  return (
    <div className="flex h-screen">
      {images.map((image, index) => (
        <div
          key={index}
          className="background-image"
          style={{ backgroundImage: `url(${image})` }}>
          <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
          <div className="flex flex-col justify-center items-center">
            <div className="z-10 text-4xl text-center bg-transparent">{texts[index]}</div>  
            <div className="z-10 text-center items-center"> <FontAwesomeIcon icon={faArrowRight}/> </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BackgroundImages;
