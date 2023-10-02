import React from "react";
import { useState, useEffect } from "react";
import "./styles/circlebar.css";

function Semircirclebar() {
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        const progressBar = document.querySelectorAll(".progress");

        progressBar.forEach((progress) => {
            const bar = progress.querySelector(".bar");
            const val = progress.querySelector("span");
            const perc = parseInt(val.textContent, 10);

            let currentPercent = 0;

            const interval = setInterval(() => {
                if (currentPercent >= perc) {
                    clearInterval(interval);
                } else {
                    currentPercent++;
                    bar.style.transform = `rotate(${45 + currentPercent * 1.8}deg)`;
                    val.textContent = currentPercent + "%";
                }
            }, 30);
        });
    }, []);
    return (
        <>
            <div className="progress">
                <div className="barOverflow">
                    <div className="bar"></div>
                </div>
                <span>10</span>
            </div>

            <div className="progress">
                <div className="barOverflow">
                    <div className="bar"></div>
                </div>
                <span>100</span>
            </div>

            <div className="progress">
                <div className="barOverflow">
                    <div className="bar"></div>
                </div>
                <span>34</span>
            </div>

            <div className="progress">
                <div className="barOverflow">
                    <div className="bar"></div>
                </div>
                <span>56.5</span>
            </div>
        </>
    );
}

export default Semircirclebar;
