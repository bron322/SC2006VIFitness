import React from 'react';
import Core from "./styles/photos/Core.jpg";
import Abs from "./styles/photos/Abs.png";
import Oblique from "./styles/photos/Obliques.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight} from '@fortawesome/free-solid-svg-icons';

function CoreComponent(){
    return(
        <>
        <div className="flex">
            <div className="sticky top-0 flex-none w-1/3 h-screen">
                <img src={Core} className="h-screen w-full object-cover"/>
            </div>
            <div className="flex-grow px-24 pt-10">
                <div class="grid grid-cols-2 grid-rows-3 gap-x-24 gap-y-20 overflow-y-auto">
                    {/* Card 1 */}
                    <div class="bg-white p-4 rounded-lg shadow-md flex justify-center items-center">
                        <img src={Oblique} className="h-full w-full object-contain object-center"/>
                    </div>

                    {/* Card 2 */}
                    <div class="bg-white p-4 rounded-lg shadow-md flex justify-center items-center">
                        <img src={Abs} className="h-full w-full object-contain object-center"/>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default CoreComponent;