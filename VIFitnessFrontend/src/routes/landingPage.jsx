import Header from "../components/headerlanding";
import React, { useEffect, useState, useRef } from "react";
import "./styles/landingPage.css";
import BG from "./styles/photos/background.jpg";
import calendar from "./styles/photos/calendar.png";
import personalizedworkoutplan from "./styles/photos/personalized-workout-plan.png";
import macrostracker from "./styles/photos/macros-tracker.png";
import exerciseinstructions from "./styles/photos/exercise-instruction.png";
import stravadata from "./styles/photos/stravadata.png";
import Footer from "@/components/landingPageUI/footer";
import Splitting from "splitting";
import Preloader from "@/components/landingPageUI/preloader";
import emitter from "@/utils/eventEmitter";
import ScrollToTop from "@/utils/ScrollToTop";
import gsap from "gsap";

export default function LandingPage() {
  const initialised = useRef(false);
  const [rotation, setRotation] = useState(360);
  const [radius, setRadius] = useState(70);
  const pulse = useRef();
  const [isPreloading, setIsPreloading] = useState(true);

  const tl = useRef();
  const tl2 = useRef();
  const headerRef = useRef();
  const spinRef = useRef();

  //for spining scroll down button
  useEffect(() => {
    if (!initialised.current) {
      // initialised.current = true;

      Splitting();
      let cursor = document.querySelector(".cursor"),
        cursorText = cursor.querySelectorAll(".char");

      const rotate = (radius, rotation) => {
        for (let i = 0; i < cursorText.length; i++) {
          let rotation = i * (360 / cursorText.length);
          gsap.set(cursorText[i], {
            transformOrigin: `0px ${radius}px`,
            x: radius,
            rotate: rotation,
          });
          gsap.set(cursor, {
            transformOrigin: "center center",
            rotation: 0,
            width: radius * 2,
            height: radius * 2,
          });
        }
        let rotate = gsap.timeline({ repeat: -1 });
        rotate.to(cursor, { rotation: rotation, duration: 10, ease: "none" });
      };

      rotate(radius, rotation);
    }
  }, [rotation]);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth",
        });
      });
    });
  }, []);

  function FadeInLeft(props) {
    const [isVisible, setVisible] = useState(false);
    const domRef = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
          }
        });
      });

      if (domRef.current) {
        observer.observe(domRef.current);
      }

      return () => {
        if (domRef.current) {
          observer.unobserve(domRef.current);
        }
      };
    }, []); // Empty dependency array to run this effect only once, like componentDidMount and componentWillUnmount

    return (
      <div
        className={`fade-in-left ${isVisible ? "is-visible" : ""}`}
        ref={domRef}
      >
        {props.children}
      </div>
    );
  }

  function FadeInRight(props) {
    const [isVisible, setVisible] = useState(false);
    const domRef = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
          }
        });
      });

      if (domRef.current) {
        observer.observe(domRef.current);
      }

      return () => {
        if (domRef.current) {
          observer.unobserve(domRef.current);
        }
      };
    }, []);

    return (
      <div
        className={`fade-in-right ${isVisible ? "is-visible" : ""}`}
        ref={domRef}
      >
        {props.children}
      </div>
    );
  }

  const handleMouseEnter = () => {
    setRotation(-360);
    gsap.to(pulse.current, {
      opacity: 1,
      duration: 1,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    setRotation(360);
    gsap
      .to(pulse.current, {
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      })
      .from();
  };

  // click event after preloader animation finish
  var MouseDownEvent = function () {
    document.documentElement.style.cursor = "default";

    FadeOutPreloader();
  };

  const FadeInMainPage = () => {
    tl2.current = gsap
      .timeline({
        onComplete: () => {
          document.documentElement.style.overflow = "auto";
        },
      })
      .to(".hero-text-wrapper", {
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
      })
      .to(
        spinRef.current,
        {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        },
        "<"
      );
  };

  // fade out preloader after animation finish
  const FadeOutPreloader = () => {
    window.removeEventListener("mousedown", MouseDownEvent);
    document.documentElement.style.overflow = "auto";
    tl.current = gsap
      .timeline({
        onComplete: () => {
          setIsPreloading(false);
          // FadeInMainPage();
        },
      })
      .to(
        ".preloader-wrapper",
        {
          opacity: 0,
          zIndex: -1,
          duration: 1,
          ease: "power2.out",
        }
        // "-=0.3"
      );
  };

  useEffect(() => {
    emitter.on("preloader-ready", () => {
      window.addEventListener("mousedown", MouseDownEvent);
    });
  }, []);

  ScrollToTop();

  return (
    <>
      {isPreloading && <Preloader />}
      <div className="landing-page-wrapper">
        <Header ref={headerRef} />

        <div className="image-container">
          <img src={BG} alt="LOGO"></img>
          <div className="flex flex-col items-center ">
            <div className="absolute top-3/4 w-full h-1/4 bg-gradient-to-b from-transparent to-black z-20" />
          </div>
        </div>

        <div className="-translate-y-1/2 -translate-x-1/2 flex flex-col items-center justify-center top-2/3 left-1/2 z-10 absolute">
          <div className="hero-text-wrapper flex flex-col items-center justify-center">
            <h2 className="cssanimation sequence justify-self-center hk-font text-transparent hollow">
              Welcome
            </h2>
            <h2 className="cssanimation sequence justify-self-center hk-font text-transparent hollow">
              to
            </h2>
            <h2 className="cssanimation sequence pb-20 hk-font text-neutral-100 ">
              VIFitness
            </h2>
          </div>

          <a
            href="#macros"
            className="opacity-70 hover:opacity-100 transition-opactity hover:cursor-pointer"
          >
            <div
              className="spin-text-wrapper flex justify-center items-center hover:cursor-pointer relative "
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              ref={spinRef}
            >
              <div className="w-[100px] h-[100px] absolute  " ref={pulse}>
                <div className="pulse absolute"></div>
                <div className="pulse2 absolute"></div>
              </div>

              <div className="cursor cursor-pointer hover:cursor-pointer">
                <div
                  className="cursor-text text-neutral-300 hover:cursor-pointer"
                  data-splitting=""
                >
                  Explore • our • Features •
                </div>
              </div>
            </div>
          </a>
        </div>

        <div className="content-container" id="macros">
          <FadeInLeft>
            <div className="content-text">
              <div className="content-header hk-light">Track Your Macros</div>
              <div className="content-info text-neutral-400 tracking-tight leading-tight">
                Experience the convenience of our Macro Tracker, a user-friendly
                nutrition tool with dynamic features, meal queries, and
                intuitive calorie and macro visualizations.
              </div>
            </div>
          </FadeInLeft>
          <div className="w-5/12 h-4/12 z-10 bg-cover mt-32 hover:scale-125 duration-100">
            <img
              src={macrostracker}
              alt="macros-tracker"
              style={{
                display: "absolute",
                overflow: "hidden",
                objectFit: "cover",
                zIndex: "3",
                pointerEvents: "none",
              }}
            />
          </div>
        </div>

        <div className="content-container" id="workout-planner">
          <div className="w-5/12 h-4/12 z-10 bg-cover mt-32 hover:scale-125 duration-100">
            <img
              src={personalizedworkoutplan}
              alt="personalized-workout-plan"
              style={{
                display: "absolute",
                overflow: "hidden",
                objectFit: "cover",
                zIndex: "3",
                pointerEvents: "none",
              }}
            />
          </div>
          <FadeInRight>
            <div className="content-text">
              <div className="content-right content-header ">
                Personalized Workout Plan
              </div>
              <div className=" content-right content-info text-neutral-400 tracking-tight leading-tight">
                Discover our innovative Workout Planner, which generates
                personalized workouts with a comprehensive exercise library,
                progress tracking, and expert guidance.
              </div>
            </div>
          </FadeInRight>
        </div>

        <div className="content-container">
          <FadeInLeft>
            <div className="content-text">
              <div className="content-header">Tailored Exercises</div>
              <div className="content-info text-neutral-400 tracking-tight leading-tight">
                Exercise at your own pace with our specially Tailored Exercises,
                suitable for beginners to professionals
              </div>
            </div>
          </FadeInLeft>
          <div className="w-5/12 h-4/12 z-10 bg-cover mt-32 hover:scale-125 duration-100">
            <img
              src={exerciseinstructions}
              alt="exercise-instructions"
              style={{
                display: "absolute",
                overflow: "hidden",
                objectFit: "cover",
                zIndex: "3",
                pointerEvents: "none",
              }}
            />
          </div>
        </div>

        <div className="content-container" id="strava-integration">
          <div className="w-5/12 h-4/12 z-10 bg-cover mt-32 hover:scale-125 duration-100">
            <img
              src={calendar}
              alt="calendar"
              style={{
                display: "absolute",
                overflow: "hidden",
                objectFit: "cover",
                zIndex: "3",
                pointerEvents: "none",
              }}
            />
          </div>
          <FadeInRight>
            <div className="content-text">
              <div className=" content-right content-header">
                Individual Calendar
              </div>
              <div className="  content-right content-info text-neutral-400 tracking-tight leading-tight">
                Log your workouts and complete them, strategically planning your
                daily exercise routines with our advanced Workout Calendar. Stay
                motivated and in control as you schedule and customize your
                exercises with ease
              </div>
            </div>
          </FadeInRight>
        </div>

        <div className="content-container">
          <FadeInLeft>
            <div className="content-text">
              <div className="content-header">Progression Tracking</div>
              <div className=" content-info text-neutral-400 tracking-tight leading-tight">
                Effortlessly track your fitness journey with our Data Tracking.
                Stay motivated as you schedule and track your exercises with
                ease, ensuring a successful path to your fitness goals.
              </div>
            </div>
          </FadeInLeft>
          <div className="w-5/12 h-4/12 z-10 bg-cover mt-32 hover:scale-125 duration-100">
            <img
              src={stravadata}
              alt="progression-tracking"
              style={{
                display: "absolute",
                overflow: "hidden",
                objectFit: "cover",
                zIndex: "3",
                pointerEvents: "none",
              }}
            />
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
