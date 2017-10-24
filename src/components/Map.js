import React, { Component } from 'react';

import Marker from './Marker';

//import from redux
import { connect } from 'react-redux';

//import actions
import { displayEvents, getCurrentLoc } from '../actions';

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
    let current = navigator.geolocation.watchPosition(position => {
      this.setState({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      },() => this.getCurrent())
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

  }

  componentDidMount(){

    this.establishMap();
    this.plotPoints();


}

//function to be called that will create points and markers for each event
plotPoints(){

  let allPoints = document.querySelectorAll('.eventMarker')

    allPoints.forEach(point => point.remove())

  //loop through the stored events
  for (let i = 0; i < this.props.events.length; i++) {

    //create a div for the marker
    let el = document.createElement('div');
    el.classList.add('shine');
    el.classList.add('eventMarker');

    let newMark = this.props.events[i] //shortened for use for below

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
          .setHTML(`<h3> ${newMark.description} </h3><p> ${this.convertTime(newMark.eventStart)} - ${this.convertTime(newMark.eventEnd)} </p><button className="like" onClick={${()=>this.handleLike()}}>&#128077; </button><span> : ${newMark.likes.length}<span>`)


    //create a mapbox marker to be associate with the div created above
    const marker = new window.mapboxgl.Marker(el)
      .setLngLat([newMark.longitude, newMark.latitude])
      .setPopup(popup)
      .addTo(this.map);
  }
}

handleLike(){
  console.log('liked')
}

//get the users current location
getCurrent(){

  // console.log(this.props.location)TODO: come back to this

  let updateCurrent = document.querySelectorAll('.currentPos');
    // updateCurrent.remove();

    updateCurrent.forEach(el=> el.remove())


  console.log(updateCurrent);
  //Wait for the coordinates to update, and once they do, display the icon
    let curr = document.createElement('div');//create div for the marker
    curr.className = 'currentPos';
    //set the coordinates for the marker and add it to the map
    const current = new window.mapboxgl.Marker(curr)
      .setLngLat([this.state.lng, this.state.lat])
      .addTo(this.map)
}
// // //
componentWillUpdate(){

  // if (this.props.location.lng !== null){
  //   this.getCurrent();
  // }
}

removeCurr(){
  // let current = document.getElementsByClassName('currentPos');
  //   // current.parentNode.removeChild(current);
  //   current.remove()
}

componentWillReceiveProps(nextProps){
  this.plotPoints()

  console.log(nextProps.events.length)
  console.log(this.props.events.length)
  if (nextProps.events.length !== this.props.events.length)
  // if (nextProps.events.length > this.props.events.length)
  {
    this.plotPoints()
  }
// this.plotPoints();
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

    //loop through the events and create a marker for each one
    // for (let i = 0; i < this.props.events.length; i++) {
    //
    //   //create a div for the marker
    //   let el = document.createElement('div');
    //   el.classList.add('shine');
    //
    //   let newMark = this.props.events[i] //shortened for use for below
    //
    //   //give the events a marker that matches their category
    //   if (newMark.category === "Sports/Outdoors") {
    //     el.classList.add('marker')
    //   } else if (newMark.category === "Community") {
    //     el.classList.add('marker4')
    //   } else if (newMark.category === "Food/Bev") {
    //     el.classList.add('marker3')
    //   } else if (newMark.category === "Music/Art") {
    //     el.classList.add('marker2')
    //   } else if (newMark.category === "") {
    //     el.classList.add('marker5')
    //   }
    //
    //   // create a custom popup for each individual item
    //   let popup = new window.mapboxgl.Popup({ offset: 25 })
    //         .setHTML(`<h3> ${newMark.description} </h3><p> ${this.convertTime(newMark.eventStart)} - ${this.convertTime(newMark.eventEnd)} </p><button className="like" onClick={${()=>this.handleLike()}}>&#128077; </button><span> : ${newMark.likes.length}<span>`)
    //
    //
    //   //create a mapbox marker to be associate with the div created above
    //   const marker = new window.mapboxgl.Marker(el)
    //     .setLngLat([newMark.longitude, newMark.latitude])
    //     .setPopup(popup)
    //     .addTo(this.map);
    // }

    return(
        <div id='map' className='mapStyle'>

        </div>
    )
  }
}

function mapState2Props(state){
  return{
    events: state.events,
    location: state.location
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
    },
  }
}

export default connect(mapState2Props, mapDispatch2Props) (Map);
