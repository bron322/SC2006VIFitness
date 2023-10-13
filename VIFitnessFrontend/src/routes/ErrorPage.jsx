import React from 'react';
import { useRouteError } from "react-router-dom";
import ChromeDinoGame from 'react-chrome-dino';
import Topbar from "./topbar";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  const styles = {
    page: {
      height: '100vh',
      backgroundColor: '#020817',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    heading: {
      fontSize: '2.5em',  
      marginBottom: '20px'
    },
    bodyText: {
      fontSize: '1.1em', 
      marginBottom: '20px'
    }

    ,gameContainer: {
      width: '100%',
      margin: '0 auto'
    }
  };

  return (
    <div>
      <div className="Topbar">
        <Topbar />
      </div>
      <div style={styles.page} id="error-page">
        <h1 style={styles.heading}>404 Page Not Found</h1>
        <p style={styles.bodyText}>We couldn't find the page you are looking for.</p>
        <p style={styles.bodyText}>
          Would you like to head back to our <Link to="/" style={{ textDecoration: 'underline' }}>homepage</Link>? 
        </p>
        <div style={styles.gameContainer}>
          <ChromeDinoGame />
        </div>
      </div>
    </div>
  );
}