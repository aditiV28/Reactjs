import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Person.css';
import Auxiliary from '../../../hoc/Auxiliary';
import withClass from '../../../hoc/WithClass';

// const StyledDiv = styled.div`
//     width: 60%;
//     margin: 16px auto;
//     border: 1px solid #eee;
//     box-shadow: 0px 2px 3px #ccc;
//     padding: 16px;
//     text-align: center;
//
//     @media(min-width: 500px) {
//       width: 450px;
//     }
// `;

class Person extends Component {
  constructor(props){
    super(props);
    this.inputElementRef = React.createRef();
  }
  componentDidMount(){
    this.inputElementRef.current.focus();
  }

  // const style = {
  //   '@media(min-width: 500px)':{
  //     width: '450px'
  //   }
  // };
  // const rnd = Math.random();
  // if(rnd > 0.7){
  //   throw new Error('something went wrong');
  // }

  render(){
    return (
      <Auxiliary>
        {this.props.isAuth ? <p>Authenticated</p> : <p>Please log in</p>}
        <p onClick={this.props.click}>
        I'm {this.props.name} and I'm {this.props.age} years old
        </p>,
        <p key="i2">{this.props.children}</p>,
        <input
        key="i3"
        // ref={(inputEl) => {this.inputElement = inputEl} }
        ref={this.inputElementRef}
        type="text"
        onChange={this.props.changed} value={this.props.name}/>
      </Auxiliary>
    );
  }

};

Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func
};

export default withClass(Person,"Person");
