import React from 'react';

import "./DrawerToggle.css";

const drawerToggle = (props) => (
  <div className="DrawerToggle" onClick={props.sidedrawerClicked}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default drawerToggle;
