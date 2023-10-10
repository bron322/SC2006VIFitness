import Header from "../components/headerlanding";
import React, { useEffect } from "react";
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
} from "@fortawesome/free-solid-svg-icons";

export default function LandingPage() {
  function initializePage() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth",
        });
      });
    });
  }


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
    const [isVisible, setVisible] = React.useState(true);
    const domRef = React.useRef();
    React.useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => setVisible(entry.isIntersecting));
      });
      observer.observe(domRef.current);
      return () => observer.unobserve(domRef.current);
    }, []);
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
    const [isVisible, setVisible] = React.useState(true);
    const domRef = React.useRef();
    React.useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => setVisible(entry.isIntersecting));
      });
      observer.observe(domRef.current);
      return () => observer.unobserve(domRef.current);
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

  useEffect(() => {
    initializePage();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Element is now visible
          // Add your logic here
        } else {
          // Element is no longer visible
          // Add your cleanup logic here
        }
      });
    });

    // Observe the elements you want to track

    return () => {
      // Cleanup code for unmounting or when the component is no longer needed
      // Remove the observers and any other cleanup
      observer.disconnect();
    };
  }, []);


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
            Welcome to
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
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s,
              </div>
            </div>
          </FadeInLeft>
          <div className="content-image" />
        </div>

        <div className="content-container">
          <div className="content-image" />
          <FadeInRight>
            <div className="content-text">
              <div className="content-header">
                <FontAwesomeIcon icon={faCalendar} size="xl" /> Personalized
                Workout Plan
              </div>
              <div className="content-info">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s,
              </div>
            </div>
          </FadeInRight>
        </div>

        <div className="content-container">
          <FadeInLeft>
            <div className="content-text">
              <div className="content-header">
                <FontAwesomeIcon icon={faMessage} size="xl" /> Community
              </div>
              <div className="content-info">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s,
              </div>
            </div>
          </FadeInLeft>
          <div className="content-image" />
        </div>

        <div className="content-container">
          <div className="content-image" />
          <FadeInRight>
            <div className="content-text">
              <div className="content-header">
                <FontAwesomeIcon icon={faCapsules} size="xl" /> Supplementary
                Recommendations
              </div>
              <div className="content-info">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s,
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
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s,
              </div>
            </div>
          </FadeInLeft>
          <div className="content-image" />

        </div>
      </div>
    </>
  );
}
