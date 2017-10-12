import React, { Component } from 'react';

import './styles/App.css';

//import components
import EventForm from './components/EventForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">

          <h1 className="App-title">Vamp</h1>
        </header>
        <EventForm />

      </div>
    );
  }
}

export default App;
