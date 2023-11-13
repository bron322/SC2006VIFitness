import { useEffect, useRef, useState } from "react";
import "./preloader.css";
import { trefoil } from "ldrs";
import Splitting from "splitting";
import { useLayoutEffect } from "react";
import gsap from "gsap";
import { LinearProgress } from "@mui/material";
import emitter from "@/utils/eventEmitter";

export default function Preloader() {
  trefoil.register();
  const textWrapper = useRef();
  const loading = useRef();
  const tl = useRef();
  const [isLoading, setIsloading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    Splitting();
  }, []);

  // progress bar animation
  useEffect(() => {
    if (progress >= 100) {
      if (isLoading) {
        setIsloading(false);
      }
      return;
    }
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 99 : prev + 4));
    }, 100);
    return () => {
      clearInterval(timer);
    };
  });

  const OnPreloaderFinish = () => {
    document.documentElement.style.cursor = "pointer";
    emitter.emit("preloader-ready");
  };

  useLayoutEffect(() => {
    let context = gsap.context(() => {
      tl.current = gsap
        .timeline({ onComplete: OnPreloaderFinish })
        .from(
          textWrapper.current,
          {
            opacity: 0,
            duration: 2,
            ease: "power2.out",
          },
          "+=0.5"
        )
        .from(
          ".progress-bar-wrapper",
          {
            opacity: 0,
            duration: 2,
            ease: "power2.out",
          },
          "<"
        )
        .from(
          ".loading .char",
          {
            opacity: 0,
            fontFamily: "StarrailGlyph",
            color: "yellow",
            duration: 0.15,
            ease: "power2.out",
            stagger: {
              from: "random",
              amount: 0.8,
            },
          },
          "-=1.5"
        )
        .to(".loading .char", {
          delay: 1,
          opacity: 0,
          fontFamily: "StarrailGlyph",
          color: "yellow",
          duration: 0.15,
          ease: "power2.out",
          stagger: {
            from: "random",
            amount: 0.8,
          },
        })
        .from(
          ".loading2 .char",
          {
            opacity: 0,
            fontFamily: "StarrailGlyph",
            color: "yellow",
            duration: 0.15,
            ease: "power2.out",
            stagger: {
              from: "random",
              amount: 0.5,
            },
          },
          "-=0.8"
        );
    }, textWrapper);
    return () => context.revert();
  }, []);
  return (
    <>
      <div className="preloader-wrapper bg-neutral-950 flex justify-center items-center">
        <div
          className="text-wrapper flex flex-col items-center"
          ref={textWrapper}
        >
          <l-trefoil
            size="150"
            stroke="3"
            stroke-length="0.2"
            bg-opacity="0.05"
            speed="7"
            color="white"
          ></l-trefoil>
          <div className="progress-bar-wrapper">
            <LinearProgress
              sx={{ "& .MuiLinearProgress": { maxHeight: "2px" } }}
              className="progress-bar mt-5 w-[10vw] h-[1px]"
              variant="determinate"
              color="inherit"
              value={progress}
            />
          </div>
          <div className="flex flex-col justify-center items-center relative">
            <div
              className="loading text-neutral-300 mt-5 text-sm"
              data-splitting=""
              ref={loading}
            >
              loading ... please wait
            </div>
            <div
              className="loading2 text-neutral-300 mt-5 text-sm absolute"
              data-splitting=""
              ref={loading}
            >
              click to enter
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
