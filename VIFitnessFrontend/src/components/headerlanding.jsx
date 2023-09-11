import React, { Component, useState, useEffect } from 'react'
import './styles/header.css'
import VILOGO from './styles/photos/VILOGO.jpg'



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
            <a href="/">
              <img
              src = {VILOGO}
              alt = "LOGO" 
              style={{ width: '10%', height: '10%', display: 'block' }}></img></a>
          </div>
          <div className="login-register-container">
            <div className="login"><a href="/Login" className='white-link'>Login</a></div>
            <div className="register"><a href="/Register" className='white-link'>Register</a></div>
          </div>
      </div>
    );
}

export default Header;