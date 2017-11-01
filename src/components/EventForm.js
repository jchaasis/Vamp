import React, { Component } from 'react';

//import from redux
import { connect } from 'react-redux';

//import components
import LocationResult from './LocationResult';

//import actions
import { displayEvents } from '../actions';

//import misc functions
import { replaceTime, splitTime } from '../util'

class EventForm extends Component{
  constructor(props){
    super(props)

    //store the event data in the local state as users fill out the form.
    this.state = {
      location_text: '', // text that appears in the box
      //create event object to pass along
      startDisp: 'Start Time',
      stopDisp: 'End Time',
      event:{
        description: '',
        category:'',
        start: '',
        stop: '',
        location: {
          name: '',
          lat:'',
          long:''
        },
      },
      searchResults: null, //location fetch results
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

sliderStart(ev){
  //set store the time that will be used to display on the form
  this.setState({
    startDisp: (replaceTime(ev.target.value)),
  })
  //store the value that will be sent to the backend upon form submission
  this.setState({
    event: {
      description: this.state.event.description,
      category: this.state.event.category,
      start: splitTime(ev.target.value),
      stop: this.state.event.stop,
      location: this.state.event.location,
    }
  })

}

sliderStop(ev){
  //store the time that will be displayed on the form
  this.setState({
    stopDisp: (replaceTime(ev.target.value)),
  })

  //store the time that will be sent to the backend upon form submission
  this.setState({
    event: {
      description: this.state.event.description,
      category: this.state.event.category,
      start: this.state.event.start,
      stop: splitTime(ev.target.value),
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

//when a location on the provided list is clicked, handle location

updateLocation(locInfo){

  this.setState({
    location_text: locInfo.place_name,

    event:{
      description: this.state.event.description,
      category: this.state.event.category,
      start: this.state.event.start,
      stop: this.state.event.stop,
        location: {
        name: locInfo.place_name,
        lat: locInfo.center[1],
        lng: locInfo.center[0],
      }
    },
    searchResults: null,//location fetch results
  })
  // After we store the info, make the search results turn null so that we do not have to see the dropdown box anymore
}

handleLocation(ev){

  let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${ev.target.value}.json?access_token=pk.eyJ1IjoidmFtcGxpZmUiLCJhIjoiY2o4bHM5YmxpMHIxcjJwanNjdzZnb3ZqdSJ9.vIPUzwa3sv1H3X0CfSbchg`;
  //fetch matching results as a user types in a location.
  fetch(url)
    .then(resp => resp.json()) //parse the json
    .then(resp => {
      this.setState({   //store the results in local state
      searchResults: resp.features ? resp.features : [], //if there is a result, push the result to the
      })
    })

    this.setState({ location_text: ev.target.value });

    // this.setState({
    //   event: {
    //     description: this.state.event.description,
    //     category: this.state.event.category,
    //     start: this.state.event.start,
    //     stop: this.state.event.stop,
    //     location: {
    //         name: this.state.event.location.place_name,
    //         lat: this.state.event.location.lat,
    //         lng: this.state.event.location.lng
    //     }
    //   }
    // })

}

// when the form is submitted,
handleAdd(){

    let details = this.state.event //shortened for ease of use below

    if (details.description !== '' &&
        details.category !== '' &&
        details.start !== '' &&
        details.stop !== '' &&
        details.location.lat !== '' &&
        details.location.lng !== '') {

          //send the newly added event to the server.
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
                              latitude: details.location.lat,
                              longitude: details.location.lng,
                   }),
          }).then(()=>{
             //TODO: dispatch the display action

             this.props.toggleForm()
          }).then(() => {
            this.props.display()
          })} else{

          window.alert('Please complete all fields before submission.')
        }

}

  render(){
    let results;
    //if there are search results present, display them under the location box
    if (this.state.searchResults !== null){
      results = this.state.searchResults.map((details, index) => <LocationResult key={index} location={details} updateLocation={(locInfo)=> this.updateLocation(locInfo)}/>)
    }

    return(
      <div className='eventForm'>
        <div>
          <button className="closeForm" onClick={() => this.props.toggleForm()}> X </button>
        </div>
          <input type='text' id='description' className='formInput' placeholder='Description' onChange={ ev => this.handleDescription(ev)} maxLength='70'/>

          <br/>


          <select id='categoryDropdown' className='formInput'  value={this.state.category} onChange={ev=> this.handleCategory(ev)}>
            <option value=''> Category </option>
            <option value='Sports/Outdoors'> Sports/Outdoors </option>
            <option value='Music/Art'> Music/Art </option>
            <option value='Food/Bev'> Food/Bev </option>
            <option value='Community'> Community </option>
          </select>

          <br/>

          <label className='formLabel'> </label>
          {this.state.startDisp}
          <div>

            <input className='formInput' type="range" min="" step="15" max="1440" data-values="1 9" onChange={ev=> this.sliderStart(ev)}/>
          </div>
          <br/>
          <label className='formLabel'></label>
          {this.state.stopDisp}
          <div>

            <input id='startTime' className='formInput' type="range" min="" step="15" max="1440" data-values="1 9" onChange={ev=> this.sliderStop(ev)}/>
          </div>

          <br/>

          <input type='text' placeholder='Location' className='formInput' value={this.state.location_text} onChange={ev => this.handleLocation(ev)} />
          <br/>
          <ul className='searchResultsList'>
            { results }
          </ul>
          <button className="addButton" onClick={()=> this.handleAdd()}> Add </button>
      </div>
    )
  }
}

function mapDispatch2Props(dispatch){
  return{
    display: function(){
      fetch("https://vamp-app.herokuapp.com/events")
        .then(resp => resp.json())
        .then( resp =>
             dispatch(displayEvents(resp))
        )
    }
  }
}

export default connect(null, mapDispatch2Props) (EventForm);
