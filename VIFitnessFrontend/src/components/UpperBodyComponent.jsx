import React from 'react';
import Upper from "./styles/photos/UpperBody.jpg";
import Biceps from "./styles/photos/Biceps.png";
import Chest from "./styles/photos/Chest.png";
import Lats from "./styles/photos/Lats.png";
import Shoulders from "./styles/photos/Shoulders.png";
import Triceps from "./styles/photos/Triceps.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight} from '@fortawesome/free-solid-svg-icons';

function UpperBodyComponent(){
    return(
        <>
        <div className="flex">
            <div className="sticky top-0 flex-none w-1/3 h-screen">
                <img src={Upper} className="h-screen w-full object-cover"/>
            </div>
            <div className="flex-grow px-24 pt-10">
                <div class="grid grid-cols-2 grid-rows-3 gap-x-24 gap-y-20 overflow-y-auto">
                    {/* Card 1 */}
                    <div class="bg-white p-4 rounded-lg shadow-md flex justify-center items-center">
                        <img src={Biceps} className="h-full w-full object-contain object-center"/>
                    </div>

                    {/* Card 2 */}
                    <div class="bg-white p-4 rounded-lg shadow-md flex justify-center items-center">
                        <img src={Chest} className="h-full w-full object-contain object-center"/>
                    </div>

                    {/* Card 3 */}
                    <div class="bg-white p-4 rounded-lg shadow-md flex justify-center items-center">
                        <img src={Shoulders} className="h-full w-full object-contain object-center"/>
                    </div>

                    {/* Card 4 */}
                    <div class="bg-white p-4 rounded-lg shadow-md flex justify-center items-center">
                        <img src={Triceps} className="h-full w-full object-contain object-center"/>
                    </div>

                    {/* Card 5 */}
                    <div class="bg-white p-4 rounded-lg shadow-md flex justify-center items-center">
                        <img src={Lats} className="h-full w-full object-contain object-center"/>
                    </div>

                    {/* Card 6 */}
                    <div class="bg-white p-4 rounded-lg shadow-md flex justify-center items-center">
                        <img src="https://www.sadanduseless.com/wp-content/uploads/2022/08/synthol-freaks.png" className="h-full w-full object-contain object-center"/>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default UpperBodyComponent;