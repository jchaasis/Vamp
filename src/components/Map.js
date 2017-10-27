import React, { Component } from 'react';

import Marker from './Marker';
import Popup from './Popup';

//import from redux
import { connect } from 'react-redux';

//import actions
import { displayEvents, getCurrentLoc } from '../actions';

//import notifications
import Notification from './Notification';
import flame from '../styles/flame.png'

//import other functions
import { sortTime } from '../util';


class Map extends Component {
  constructor(props){
    super(props);
    //store coordinates of the current location
    this.state = {
      lat: null,
      lng: null,
      addMark: [],
    }
  }

  //set the state of the current location. TODO: delete this function in development
  // updateLocation(latitude, longitude){
  //   this.setState({
  //     lat: latitude,
  //     lng: longitude,
  //   })
  // }
  //
  //get our current location and watch to see if it updates


  getLocation(){
    //get the coordinates or our current location and watch for a change.
    let current = navigator.geolocation.watchPosition(position => {
      this.setState({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      },() => this.getCurrent()) //once we have the coordinates, plot the points
    })
  }

  componentWillMount(){
    this.getLocation();
    // // this.props.getCurrentLoc()
  }

  establishMap(){
    //access Token for map
    window.mapboxgl.accessToken = 'pk.eyJ1IjoidmFtcGxpZmUiLCJhIjoiY2o4bHM5YmxpMHIxcjJwanNjdzZnb3ZqdSJ9.vIPUzwa3sv1H3X0CfSbchg';
    //map details
    this.map = new window.mapboxgl.Map({
        container: 'map',
        center:[this.state.lng, this.state.lat],
        style: 'mapbox://styles/vamplife/cj8om9bgf8tm92ro2i66lz2uh',
        positionOptions: {
            enableHighAccuracy: true
        },
          trackUserLocation: true
    });
    //zoom in, zoom out, and compass control
    this.map.addControl(new window.mapboxgl.NavigationControl());
  }

  componentDidMount(){
    //load the map once the component mounts
    this.establishMap();
  }

//function to be called that will create points and markers for each event
plotPoints(){
  //find all the points that are currently on the map which have the class 'eventMarker'
  let allPoints = document.querySelectorAll('.eventMarker')
    //remove each of these points before re adding them
    allPoints.forEach(point => point.remove())

  //create variable to signify what group of events will be displayed
  let availableEvents;

  //if the filter category in the store is undefined, display all events, if not filter the events and display only those matching the category
  if (this.props.filter === 'Show All'){
    availableEvents = this.props.events
  } else {
    availableEvents = this.props.events.filter(event => event.category === this.props.filter)
    console.log(this.props.filter)
    console.log(availableEvents)
  }

  //loop through the stored events
  for (let i = 0; i < availableEvents.length; i++) {

    //create a div for the marker
    let el = document.createElement('div');
    // el.classList.add('shine');
    el.classList.add('eventMarker');

    let newMark = availableEvents[i] //shortened for use below

    //add the pulse effect to events that are popular
    if (newMark.likes.length >= 20) {
      el.classList.add('shine')
    }

    //give the events a marker that matches their category
    if (newMark.category === "Sports/Outdoors") {
      el.classList.add('marker')
    } else if (newMark.category === "Community") {
      el.classList.add('marker4')
    } else if (newMark.category === "Food/Bev") {
      el.classList.add('marker3')
    } else if (newMark.category === "Music/Art") {
      el.classList.add('marker2')
    } else if (newMark.category === "") {
      el.classList.add('marker5')
    }

    // create a custom popup for each individual item
    let popup = new window.mapboxgl.Popup({ offset: 25 })
          // .setHTML(<Popup/>)
          .setHTML(`<div><h3> ${newMark.description} </h3><p> ${this.convertTime(newMark.eventStart)} - ${this.convertTime(newMark.eventEnd)} </p><button class="like">&#128077; </button><span> : ${newMark.likes.length}<span></div>`)

    // Get the button inside of this popup. Add an event listener
    // that calls the handleLike() function.
    const button = popup._content.querySelector('button.like');
    button.addEventListener('click', () => {
      this.handleLike(newMark);
    });

    //create a mapbox marker to be associate with the div created above
    const marker = new window.mapboxgl.Marker(el)
      .setLngLat([newMark.longitude, newMark.latitude])
      .setPopup(popup)
      .addTo(this.map);
  }

}
//handle the liking of an event
handleLike(event){
  //send the post request
  fetch(`https://vamp-app.herokuapp.com/add-likes/${event.id}`, {
           method: 'POST',
           headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
           },
           body: JSON.stringify({

           }),
  })
  .then(() => {
    this.props.display()
  })
}

//get the users current location
getCurrent(){
  for (let i = 0; i < this.props.events.length; i++){
    let isClose = this.props.events[i]

    let a = isClose.latitude - this.state.lat
    let b = isClose.longitude - this.state.lng

    let fence = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))
    // console.log(fence)

    if (fence <= 0.00137241985 && isClose.likes.length >= 20){
      // console.log("HOT SPOT!")
      window.Notification.requestPermission().then((permission)=>{
        let n = new window.Notification("L I T  Event Nearby!", {body: `${isClose.description}`, icon: `${flame}`});
      });

    }
    // console.log(window.Notification.permission);

  }

  // console.log(this.props.location)TODO: come back to this

  //select all divs with the currentPos classname
  let updateCurrent = document.querySelectorAll('.currentPos');
    // delete those divs before adding the newest one
    updateCurrent.forEach(el=> el.remove())

  //create a div for the current position marker
    let curr = document.createElement('div');//create div for the marker
    curr.className = 'currentPos';
    //set the coordinates for the marker and add it to the map
    const current = new window.mapboxgl.Marker(curr)
      .setLngLat([this.state.lng, this.state.lat])
      .addTo(this.map)
}

componentWillUpdate(){


}

componentWillReceiveProps(nextProps){
  // this.plotPoints()

}

//convert the time into am/pm format.
convertTime(time){
  //split the time at the colons
  let splitTime = time.split(':');

  let meridies ; // used to store am or pm

  //remove the seconds
  splitTime.splice(2, 1)

  //convert afternoon time
  if (parseInt(splitTime[0]) > 12){
    meridies = 'pm'
    splitTime[0] = (parseInt(splitTime[0]) - 12).toString();//Convert the hours into a number then subtract 12. After calculating the new number, convert back to a string.
  } else {
    //add am to the morning time
    meridies = 'am'
  }
  //return the final result
  return(splitTime.join(':') + meridies)
}

  render(){
    this.plotPoints()

    return(
        <div id='map' className='mapStyle'>
        </div>
    )
  }
}

function mapState2Props(state){
  return{
    events: state.events,
    location: state.location,
    filter: state.filter,
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
  }
}

export default connect(mapState2Props, mapDispatch2Props) (Map);
