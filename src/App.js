import React, { Component } from 'react';

import './styles/App.css';

//import from redux
import { connect } from 'react-redux'

//import actions
import { displayEvents, getCurrentLoc } from './actions';

//import random functions
import { sortTime } from './util'
//import components
import EventForm from './components/EventForm';
import NavBar from './components/NavBar';
import MapDisp from './components/Map';

// import Legend from './components/Legend';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      addEvent: false,
    }
  }

  //get the available events when the app loads
  componentDidMount(){
    this.props.display()
    this.props.getCurrentLoc();

  }

  //when the add event button, exit button, or add button is clicked, toggle the addEvent state, either displaying the event form or hiding the event form.
  toggleEventForm(){
    this.setState({
      addEvent: !this.state.addEvent,
    })
  }


  render() {
    //when the "Add event" button is clicked, show the event form. pass the toggleEventForm function down to the form so that the exit and add buttons can use it to close the form.
    let addEvent = this.state.addEvent ? <EventForm toggleForm={() => this.toggleEventForm()}/> : null;


    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Vamp</h1>
        </header>
        <div className="main">
          <NavBar toggleForm={()=>this.toggleEventForm()}/>
          { addEvent }
          <MapDisp />
        </div>
        <footer className="App-footer">
          {/* <Legend /> */}
        </footer>
      </div>
    );
  }
}

function mapDispatch2Props(dispatch){
  return{
    display: function(){
      fetch("https://vamp-app.herokuapp.com/events")
        .then(resp => resp.json())
        .then (resp => sortTime(resp))
        .then( resp => dispatch(displayEvents(resp)))
      },
      getCurrentLoc: function(){
      navigator.geolocation.watchPosition(position => {
          dispatch(getCurrentLoc({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }))
        })
      }
  }
}

export default connect(null, mapDispatch2Props) (App);
