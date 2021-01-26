import React, { useState } from 'react';
import { connect } from 'react-redux';

import Auxiliary from '../Auxiliary/Auxiliary';
import './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const layout = props => {
  const [sideDrawerIsVisible,setSideDrawerIsVisible] = useState(false);
  // state = {
  //   showSideDrawer: false
  // }

  const sideDrawerCloseHandler = () => {
    // this.setState({showSideDrawer: false});
    setSideDrawerIsVisible(false);
  }

  const sideDrawerToggleHandler = () => {
    // this.setState((prevState) => {
    //   return {showSideDrawer: !prevState.showSideDrawer};
    // });
    setSideDrawerIsVisible(!sideDrawerIsVisible);
  }


  return(
    <Auxiliary>
      <Toolbar
      isAuth={props.isAuthenticated}
      drawerToggleClicked={sideDrawerToggleHandler}/>
      <SideDrawer
      isAuth={props.isAuthenticated}
      open={sideDrawerIsVisible}
      closed={sideDrawerCloseHandler} />
      <main className="Content">
        {props.children}
      </main>
    </Auxiliary>
  )

}

const mapStoreToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStoreToProps)(layout);
