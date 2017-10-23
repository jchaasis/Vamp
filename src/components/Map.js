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
  updateLocation(latitude, longitude){
    this.setState({
      lat: latitude,
      lng: longitude,
    })
  }

  //get our current location and watch to see if it updates
  getLocation(){
    let current = navigator.geolocation.watchPosition(position => {
      this.setState({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }, () => this.getCurrent())
    })
  }

  componentWillMount(){
    // this.props.getCurrentLoc()
  }

  componentDidMount(){
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

    this.getLocation();

    fetch("https://vamp-app.herokuapp.com/events")
      .then(resp => resp.json())
      .then(response => {
        console.log(response)
        for (let i = 0; i < response.length; i++) {
          let el = document.createElement('div');
          el.className = 'marker';

          const marker = new window.mapboxgl.Marker(el)
          .setLngLat([response[i].longitude, response[i].latitude])
          // .setPopup(popup)
          .addTo(this.map)

        }
        // addPoint(response){
        //   this.setState({
        //     addMark: [response]
        //   })

        // }
        // for (let i = 0; i < response.length; i++) {
        //   let el = document.createElement('div');
        //   el.className = 'marker';

        //   const marker = new window.mapboxgl.Marker(el)
        //   .setLngLat([response[i].longitude, response[i].latitude])
        //   // .setPopup(popup)
        //   .addTo(this.map);
        // }


    });
}

//get the users current location
getCurrent(){

  //Wait for the coordinates to update, and once they do, display the icon
    let curr = document.createElement('div');//create div for the marker
    curr.className = 'marker';
    //set the coordinates for the marker and add it to the map
    const current = new window.mapboxgl.Marker(curr)
      .setLngLat([this.state.lng, this.state.lat])
      .addTo(this.map)
}
//
componentWillUpdate(){
  console.log('updated ' + this.state.lat + '' + this.state.lng)

}

  render(){

    //get the users current location
    // if (this.state.lat !== null){
    //   this.getCurrent()
    // }


    console.log(this.state.addMark)

    for (let i = 0; i < this.state.addMark.length; i++) {
      let el = document.createElement('div');
      el.className = 'marker';

      const marker = new window.mapboxgl.Marker(el)
      .setLngLat([this.state.addMark[i].longitude, this.state.addMark[i].latitude])
      // .setPopup(popup)
      .addTo(this.map);
    }

    console.log(this.state.lat, this.state.lng)


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

export default connect(mapState2Props, mapDispatch2Props) (Map);
