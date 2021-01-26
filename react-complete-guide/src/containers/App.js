import React, { Component } from 'react';
import './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/WithClass';
import Auxiliary from '../hoc/Auxiliary';
import AuthContext from '../context/auth-context';
 //Lib to use psudo selectors and media queries in styling


class App extends Component {
  constructor(props){
    super(props);
    console.log('--app.js constructor---');

  }
  state = {
    persons: [
      {id:'101', name: 'Aditi', age: 26},
      {id:'102', name: 'Ameya', age: 28}
    ],
    showPersons: false,
    changeCounter: 0,
    authenticated: false
  }

  static getDerivedStateFromProps(props,state){
    console.log('--app.js getDerivedStateFromProps---', props);
    return state;
  }

  componentDidMount(){
    console.log('---app.js componentDidMount----');
  }

  switchNameHandler = (newName) => {
    this.setState( {
      persons: [
        {name: newName, age: 26},
        {name: 'Ameya M', age: 28}
      ]
    })
  }

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex] //Creating new copy of obj and not altering the original obj
    }

    person.name = event.target.value;

    const persons = [...this.state.persons]
    persons[personIndex] = person;

    this.setState((prevState, props) => {
      return{
        persons: persons,
        changeCounter: prevState.changeCounter + 1
      };
    });
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice(); //Create copy of main array and not change main array
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  loginHandler = () => {
    this.setState({authenticated: true});
  }

  render() {
    console.log('---app.js render-----');

    let persons = null;

    if(this.state.showPersons){
      persons =
          <Persons
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangeHandler}
            isAutheticated={this.state.authenticated} />
    }

    return (
      <Auxiliary>
          <Cockpit
          title={this.props.apptitle}
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          toggle={this.togglePersonsHandler}
          login={this.loginHandler} />
          {persons}
      </Auxiliary>

    );

    // return React.createElement('div', {className:'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default withClass(App,"App");
