import React, { useState } from 'react';
import Lower from "./styles/photos/LowerBody.jpg";
import Calves from "./styles/photos/Calves.png";
import Glutes from "./styles/photos/Glutes.png";
import Hamstring from "./styles/photos/Hamstring.jpg";
import Quads from "./styles/photos/Quads.png";
import Adductors from "./styles/photos/Adductors.jpeg";
import Abductors from "./styles/photos/Abductors.jpeg";
import MuscleCard from './MuscleCard';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function LowerBodyComponent() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <>
            <div className="flex">
                <div className={`sticky sticky-container top-0 flex-none w-1/3 h-screen ${isHovered ? 'hover-return' : ''}`}
                    onMouseOver={() => setIsHovered(true)}
                    onMouseOut={() => setIsHovered(false)}
                >
                    <Link to="/user/workout-planner">
                        <img src={Lower} className="h-full w-full object-cover"
                            alt="Workout Planner"
                        />
                         {isHovered && (
                        <p className="z-10 text-4xl bg-transparent h-1/5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <FontAwesomeIcon icon={faArrowLeft} /> Return
                        </p>
                        )}
                    </Link>
                </div>
                <div className="flex-grow px-24 pt-10 pb-10">
                    <div className="grid grid-cols-2 grid-rows-3 gap-x-24 gap-y-20 overflow-y-auto">

                        {/* Card 1 */}
                        <div className="flex justify-center">
                            <MuscleCard
                                img={Abductors}
                                title="Abductors"
                                description=""
                            />
                        </div>

                        {/* Card 2 */}
                        <div className="flex justify-center">
                            <MuscleCard
                                img={Adductors}
                                title="Adductors"
                                description=""
                            />
                        </div>

                        {/* Card 3 */}
                        <div className="flex justify-center">
                            <MuscleCard
                                img={Calves}
                                title="Calves"
                                description=""
                            />
                        </div>

                        {/* Card 4 */}
                        <div className="flex justify-center">
                            <MuscleCard
                                img={Glutes}
                                title="Glutes"
                                description=""
                            />
                        </div>

                        {/* Card 5 */}
                        <div className="flex justify-center">
                            <MuscleCard
                                img={Hamstring}
                                title="Hamstrings"
                                description=""
                            />
                        </div>

                        {/* Card 6 */}
                        <div className="flex justify-center">
                            <MuscleCard
                                img={Quads}
                                title="Quadriceps"
                                description=""
                            />
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default LowerBodyComponent;
