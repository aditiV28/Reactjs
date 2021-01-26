import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import "./SideDrawer.css";
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';

const sideDrawer = (props) => {
  let attachedClasses = ["SideDrawer", "Close"];
  if(props.open){
    attachedClasses = ["SideDrawer", "Open"];
  }

  return(
    <Auxiliary>
      <Backdrop show={props.open} backdropClicked={props.closed} />
      <div className={attachedClasses.join(' ')} onClick={props.closed}>
        <Logo height="11%"/>
        <nav>
          <NavigationItems isAuthenticated={props.isAuth}/>
        </nav>
      </div>
    </Auxiliary>
  );
};

export default sideDrawer;
