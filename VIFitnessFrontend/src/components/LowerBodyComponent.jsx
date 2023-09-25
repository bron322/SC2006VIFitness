import React from 'react';
import Lower from "./styles/photos/LowerBody.jpg";

function LowerBodyComponent() {
    return (
        <div className="flex w-1/3 h-full object-left">
            <div >
                <img src={Lower} class="h-full w-full object-cover" />
                <div class="absolute inset-0 bg-gradient-to-r from-transparent to-black"></div>
            </div>
        </div>
        // <div className="flex w-1/3 h-full object-left">
        //     <div img src={Lower}>
        //         <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black w-10"></div>
        //         <div className="flex flex-col justify-center items-center">
        //             <div className="z-10 text-4xl text-center bg-transparent">{texts[index]}</div>  
        //             <div className="z-10 text-center items-center"> <FontAwesomeIcon icon={faArrowRight}/> </div>
        //         </div>
        //     </div>
        // </div>
        
    );
  };

export default LowerBodyComponent;
