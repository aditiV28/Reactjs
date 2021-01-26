import React, { useEffect,useRef } from 'react';
import styled from 'styled-components';

import './Cockpit.css';

const cockpit = (props) => {
  const toggleButtonRef = useRef(null);


  useEffect(() => {
      toggleButtonRef.current.click();
      return() => {
        console.log('--cockpit useEffect---');
      }
  }, []);

  const StyledButton = styled.button`
    background-color: ${props => props.alt ? 'red' : 'green' };
    color: white;
    font: inherit;
    border: 1px solid blue;
    padding: 8px;
    cursor: pointer;

    &:hover  {
      background-color: ${props => props.alt ? 'salmon' : 'lightgreen' };
      color: black;
    }
  `;


  let classes = [];
  if(props.persons.length <=2 ){
    classes.push('red');
  }
  if(props.persons.length <=1){
    classes.push('bold');
  }

  return(
    <div className="Cockpit">
      <h2>Welcome to React</h2>
      <h3>{props.title}</h3>
      <p className={classes.join(' ')}>This is really working</p>
      <StyledButton ref={toggleButtonRef} alt={props.showPersons} onClick={props.toggle}>Toggle</StyledButton>
      <button onClick={props.login}>Log in</button>
    </div>
  );
};

export default cockpit;
