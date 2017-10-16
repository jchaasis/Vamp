import React, { Component } from 'react';

import './styles/App.css';

//import components
import EventForm from './components/EventForm';
import NavBar from './components/NavBar';

class App extends Component {

  render() {
    return (

      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Vamp</h1>
        </header>
        <main className="main">
          <NavBar />
          <EventForm />
        </main>
        <footer className="App-footer">
        </footer>

      </div>
    );
  }
}

export default App;
