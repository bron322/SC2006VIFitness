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

export default function LandingPage() {
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
          <h2 className="cssanimation sequence fadeInBottom font-sans font-bold justify-self-center">
            Welcome
          </h2>
          <h2 className="cssanimation sequence fadeInBottom font-sans font-bold justify-self-center">
            to
          </h2>
          <h2 className="cssanimation sequence fadeInBottom font-sans font-bold pb-20">
            VIFitness
          </h2>
          <a
            href="#macros"
            id="browse"
            className="cssanimation sequence fadeInBottom flex flex-col items-center bg-black rounded-3xl p-3 shadow-md"
          >
            <div className="text">Browse our features</div>
            <div className="text">
              <FontAwesomeIcon icon={faArrowDown} />
            </div>
          </a>
        </div>

        <div className="content-container" id="macros">
          <FadeInLeft>
            <div className="content-text">
              <div className="content-header">
                <FontAwesomeIcon icon={faBurger} size="xl" /> Track Your Macros
              </div>
              <div className="content-info">
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
              <div className="content-header">
                <FontAwesomeIcon icon={faPerson} size="xl" /> Personalized
                Workout Plan
              </div>
              <div className="content-info">
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
              <div className="content-header">
                <FontAwesomeIcon icon={faMessage} size="xl" /> Tailored
                Exercises
              </div>
              <div className="content-info">
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
              <div className="content-header">
                <FontAwesomeIcon icon={faCalendar} size="xl" /> Individual
                Calendar
              </div>
              <div className="content-info">
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
              <div className="content-header">
                <FontAwesomeIcon icon={faChartLine} size="xl" /> Progression
                Tracking
              </div>
              <div className="content-info">
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
