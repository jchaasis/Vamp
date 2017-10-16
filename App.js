import React, { Component } from 'react';

import './styles/App.css';

//import components
import EventForm from './components/EventForm';
import NavBar from './components/NavBar';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      addEvent: false,
    }
  }

  toggleEventForm(){
    console.log(this.state.addEvent)
    this.setState({
      addEvent: !this.state.addEvent,
    })
  }


  render() {
    //when the "Add event button is clicked, show the event form"
    let addEvent = this.state.addEvent ? <EventForm /> : null;

    return (

      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Vamp</h1>
        </header>
        <main className="main">
        <NavBar addEvent={()=>this.toggleEventForm()}/>
        { addEvent }
        </main>
        <footer className="App-footer">
        </footer>
      </div>
    );
  }
}

export default App;
