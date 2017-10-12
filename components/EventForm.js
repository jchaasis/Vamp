import React, { Component } from 'react';

class EventForm extends Component{

  render(){

    return(
      <div>
        <label>Description: </label>
        <input type='text'/>
        <br/>
        <label>Category: </label>
        <br/>
        <label>Start: </label>
        <br/>
        <label>Stop: </label>
        <br/>
        <label>Location: </label>
        <br/>
        <button> Add </button>
      </div>
    )
  }
}

export default EventForm;
