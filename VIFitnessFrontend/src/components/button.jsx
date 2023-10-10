import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";


const theme = {
    gray: {
        default: '#808080',
        hover: '#5f5f5f'
    },
    blue: {
        default: '#097FD9',
        hover: '#065b9c'
    }
}

const link = {
    login: {
        link: '/login'
    },
    register: {
        link: '/register'
    },
    logout: {
        link: '/'
    }
}

const Button = styled.button`
    background-color: ${props => theme[props.theme].default};
    color: white;
    padding: 7px 15px;
    border-radius: 5px;
    outline: 0;
    text-transform: uppercase;
    font-weight: 600;
    box-shadow: 0px 3px 5px darkgray;
    border: 0.5px solid #ddd;
    transition: box-shadow 1s, background-color 250ms ease;
    display: inline-flex;
    margin-right: 0.5em;
    font-weight: bold;
    &:hover {
        background-color: ${props => theme[props.theme].hover};
    }
    &:active {
        background-color: ${props => theme[props.theme].hover};
        box-shadow: inset 0 0 2px 2px #2b2b2b, 0px 3px 5px darkgray;
    }
`;
 
Button.defaultProps = {
    theme: 'gray'
}


const button = (props) => {
  return (
    <div className='button-wrapper'>
        <Link 
        to={link[props.name].link} 
        className='white-link'>
            <Button theme={props.theme}> 
                {props.name}
            </Button>
        </Link>
    </div>
  )
}

export default button;