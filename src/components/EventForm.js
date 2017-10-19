import React, { Component } from 'react';

import LocationResult from './LocationResult';
class EventForm extends Component{
  constructor(props){
    super(props)

    //store the event data in the local state as users fill out the form.
    this.state = {

      //create event object to pass along
      event:{
        description: '',
        category:'',
        start: '',
        stop: '',
        location: {
          lat:'',
          long:''
        },
      },
      //to be used if we need to display an error message due to invalid input
      searchResults: null,
    }


  }

//handle the description
handleDescription(ev){

  // let input = ev.target.value; //shortened for validation purposes

  this.setState({
    event: {
      description: ev.target.value,
      category: this.state.event.category,
      start: this.state.event.start,
      stop: this.state.event.stop,
      location: this.state.event.location,
    }
  })
}

//when a value is clicked, update the category of the event
handleCategory(ev){
  this.setState({
    event: {
      description: this.state.event.description,
      category: ev.target.value,
      start: this.state.event.start,
      stop: this.state.event.stop,
      location: this.state.event.location,
    }
  })
}
//handle start time
handleStart(ev){
  this.setState({
    event: {
      description: this.state.event.description,
      category: this.state.event.category,
      start: ev.target.value,
      stop: this.state.event.stop,
      location: this.state.event.location,
    }
  })
}

//handle stop time
handleStop(ev){
    this.setState({
      event: {
        description: this.state.event.description,
        category: this.state.event.category,
        start: this.state.event.start,
        stop: ev.target.value,
        location: this.state.event.location,
      }
    })
  }

//handle location
   //TODO: geocode location if they provide an address


handleLocation(ev){
  let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${ev.target.value}.json?access_token=pk.eyJ1IjoidmFtcGxpZmUiLCJhIjoiY2o4bHM5YmxpMHIxcjJwanNjdzZnb3ZqdSJ9.vIPUzwa3sv1H3X0CfSbchg`;
  //fetch matching results as a user types in a location.
  fetch(url)
    .then(resp => resp.json()) //parse the json
    .then(resp => this.setState({   //store the results in local state
      searchResults: resp.features ? resp.features : [],
    }))

    this.setState({
      event: {
        description: this.state.event.description,
        category: this.state.event.category,
        start: this.state.event.start,
        stop: this.state.event.stop,
        location: ev.target.value,
      }
    })

    console.log(this.state)
}

//when the form is submitted,
handleAdd(description, category, start, stop, location){
    console.log(this.state.event)
    let details = this.state.event //shortened for ease of use below

    fetch("https://vamp-app.herokuapp.com/add-events", {
             method: 'POST',
             headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify({
                        description: details.description,
                        category: details.category,
                        eventStart: details.start + ':00',
                        eventEnd: details.stop + ':00',
                        latitude: "35.2272746",
                        longitude: "-80.84646029999999",
             }),
         })

      // this.setState({
      //   event:{

      //   }
      // }, () => {
      //   console.log(this.state.event);
      //   this.props.toggleForm();
      // })
      // .then(()=>{
      //   this.sendEvent()
      // })

}

  render(){
    let results;
    if (this.state.searchResults !== null){
      results = this.state.searchResults.map(details => <LocationResult location={details} />)
    }

    // let results = resp.features.map(result => result.place_name);



    //establish blank variables to be used to gather information for the event.

    return(
      <div className='eventForm'>
        <label>Description: </label>
        <input type='text' onChange={ ev => this.handleDescription(ev)} maxLength='70'/>
        <button className="closeForm" onClick={() => this.props.toggleForm()}> X </button>
        <br/>
        <label>Category: </label>
        <select value={this.state.category} onChange={ev=> this.handleCategory(ev)}>
          <option value='Sports/Outdoors'> Sports/Outdoors </option>
          <option value='Music/Art'> Music/Art </option>
          <option value='Food/Bev'> Food/Bev </option>
          <option value='Community'> Community </option>
        </select>
        <br/>
        <label>Start: </label>
        <input type='time'onChange={ev => this.handleStart(ev)}/>
        <br/>
        <label>Stop: </label>
        <input type='time' onChange={ev => this.handleStop(ev)}/>
        <br/>
        <label>Location: </label>
        <input type='text' onChange={ev => this.handleLocation(ev)}/>
        <br/>
        <ul>
        { results }
        </ul>
        <button onClick={()=> this.handleAdd()}> Add </button>
      </div>
    )
  }
}

export default EventForm;
