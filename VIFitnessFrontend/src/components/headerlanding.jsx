
import React, { Component, useState, useEffect } from 'react'
import './styles/header.css'
import VILOGO from './styles/photos/VILOGO.jpg'
import Button from "../components/button";




function Header() {
  const [isSticky, setIsSticky] = useState(false);

  // Function to handle the scroll event
  function handleScroll() {
    if (window.scrollY > 1100) {

      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  }

  // Add a scroll event listener to determine when the header becomes sticky
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return function cleanup() {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
      <div className={`sticky-header ${isSticky ? 'animate' : ''}`}> 
          <div className="logo-container">
            <a href="/" className='white-link'>
              <img className='img'
              src = {VILOGO}
              alt = "LOGO" 
              style={{ width: '30%', height: '30%', display: 'block', overflow: 'hidden'}}></img>
              </a>
          </div>
          <div className="login-register-container">
            <Button name = "login"/>
            <Button theme="blue" name="register"/>
          </div>

      </div>
  );
}

export default Header;
