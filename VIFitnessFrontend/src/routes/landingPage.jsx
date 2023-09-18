import Header from "../components/headerlanding";
import './styles/landingPage.css'
import BG from './styles/photos/background.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faBurger, faCalendar, faCapsules, faChartLine, faMessage } from '@fortawesome/free-solid-svg-icons'


export default function LandingPage() {

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();

          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
      });
    });
  });

  return (
    <>
      <div className="landing-page-wrapper">
        <Header />

        
        <div className="image-container">
        <img src = {BG}
             alt = "LOGO"></img>
        </div>

        <div className="text-container">
          <h2>Helps for your</h2>
          <h2>ideal body fitness</h2>
          <a href="#Macro" className="white-link" style={{ scrollBehavior: 'smooth' }}>
            <h3>Browse our features <FontAwesomeIcon icon={faArrowRight} size="sm"/></h3>
          </a> 
        </div>

        <div style={{ backgroundColor: '#000000', width: '100%', height: '300px' }}/>

        <div className="content-container" id="Macro">
          <div className="content-text">
            <div className="content-header">
              <FontAwesomeIcon icon={faBurger} size="xl"/> Track Your Macros
            </div>
            <div className="content-info">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            </div>
          </div>
          <div className="content-image"/>
        </div>

        <div className="content-container" id="Macro">
          <div className="content-image"/>
          <div className="content-text">
            <div className="content-header">
              <FontAwesomeIcon icon={faCalendar} size="xl"/> Personalized Workout Plan
            </div>
            <div className="content-info">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            </div>
          </div>
        </div>

        <div className="content-container" id="Macro">
          <div className="content-text">
            <div className="content-header">
              <FontAwesomeIcon icon={faMessage} size="xl"/> Community
            </div>
            <div className="content-info">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            </div>
          </div>
          <div className="content-image"/>
        </div>

        <div className="content-container" id="Macro">
          <div className="content-image"/>
          <div className="content-text">
            <div className="content-header">
              <FontAwesomeIcon icon={faCapsules} size="xl"/> Supplementary Recommendations
            </div>
            <div className="content-info">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            </div>
          </div>
        </div>

        <div className="content-container" id="Macro">
          <div className="content-text">
            <div className="content-header">
              <FontAwesomeIcon icon={faChartLine} size="xl"/> Progression Tracking
            </div>
            <div className="content-info">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            </div>
          </div>
          <div className="content-image"/>
        </div>

      </div>
    </>
  );
}

