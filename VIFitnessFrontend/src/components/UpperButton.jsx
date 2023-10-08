import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight} from '@fortawesome/free-solid-svg-icons'

const UpperButton = () => {
  return (
    <div>
      <Link to="/user/workout-upper">
        <FontAwesomeIcon icon={faArrowRight}/>
      </Link>
    </div>
  );
};

export default UpperButton;
