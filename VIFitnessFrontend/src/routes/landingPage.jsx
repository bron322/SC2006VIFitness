import Header from "../components/headerlanding";
import React, { useEffect, useState, useRef } from "react";
import "./styles/landingPage.css";
import BG from "./styles/photos/background.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faBurger,
  faCalendar,
  faCapsules,
  faChartLine,
  faMessage,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import calendar from "./styles/photos/calendar.png";
import personalizedworkoutplan from "./styles/photos/personalized-workout-plan.png";
import macrostracker from "./styles/photos/macros-tracker.png";
import exerciseinstructions from "./styles/photos/exercise-instruction.png";
import stravadata from "./styles/photos/stravadata.png";
import Footer from "@/components/landingPageUI/footer";
import Splitting from "splitting";
import gsap from "gsap";

export default function LandingPage() {
  const initialised = useRef(false);
  const [rotation, setRotation] = useState(360);
  const [radius, setRadius] = useState(70);
  const pulse = useRef();

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
  }, [rotation, radius]);

  useEffect(() => {
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
    gsap.to(pulse.current, {
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });
  };

  return (
    <>
      <div className="landing-page-wrapper">
        <Header />

        <div className="image-container">
          <img src={BG} alt="LOGO"></img>
          <div className="flex flex-col items-center ">
            <div className="absolute top-3/4 w-full h-1/4 bg-gradient-to-b from-transparent to-black z-20" />
          </div>
        </div>

        <div className="-translate-y-1/2 -translate-x-1/2 flex flex-col items-center justify-center top-2/3 left-1/2 z-10 absolute">
          <h2 className="cssanimation sequence fadeInBottom justify-self-center hk-font text-transparent hollow">
            Welcome
          </h2>
          <h2 className="cssanimation sequence fadeInBottom justify-self-center hk-font text-transparent hollow">
            to
          </h2>
          <h2 className="cssanimation sequence fadeInBottom pb-20 hk-font text-neutral-100 ">
            VIFitness
          </h2>
          {/* <a
            href="#macros"
            id="browse"
            className="cssanimation sequence fadeInBottom flex flex-col items-center bg-black rounded-3xl p-3 shadow-md"
          >
            <div className="text">Browse our features</div>
            <div className="text">
              <FontAwesomeIcon icon={faArrowDown} />
            </div>
          </a> */}
          <a
            href="#macros"
            className="opacity-70 hover:opacity-100 transition-opactity hover:cursor-pointer"
          >
            <div
              className="flex justify-center items-center hover:cursor-pointer relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* <div className="inner absolute cursor-pointer">
                <div className="inner-text text-neutral-300" data-splitting="">
                  Scroll • Down •
                </div>
              </div> */}
              <div
                className="w-[100px] h-[100px] absolute hover:opacity-0"
                ref={pulse}
              >
                <div className="pulse absolute"></div>
                <div className="pulse2 absolute"></div>
              </div>

              <div className="cursor cursor-pointer hover:cursor-pointer">
                <div
                  className="text-neutral-300 cursor-pointer hover:cursor-pointer"
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
