import React, { Component } from 'react';


class Map extends Component {
  constructor(props){
    super(props);

    this.state = {
      lat: 0,
      lng: 0,
    }
  }

  //set the state of the current location. 
  // updateLocation(latitude, longitude){
  //
  //   this.setState({
  //     lat: latitude,
  //     lng: longitude,
  //   })
  // }

  //get our currenc location and watch to see if it updates
  getLocation(){
    let newLat;
    let newLng;

    navigator.geolocation.watchPosition(function(position){

        newLat = position.coords.latitude;
        newLng = position.coords.longitude;
        console.log(newLat, newLng);

    })

    // console.log(newLat, newLng)
    //     this.setState({
    //       lat: newLat,
    //       lng: newLng,
    //     })
    //
    //
    // console.log(this.state.lat, this.state.lng)
  }

  componentWillMount(){
    this.getLocation()
  }


  componentDidMount(){
    //access Token for map
    window.mapboxgl.accessToken = 'pk.eyJ1IjoidmFtcGxpZmUiLCJhIjoiY2o4bHM5YmxpMHIxcjJwanNjdzZnb3ZqdSJ9.vIPUzwa3sv1H3X0CfSbchg';
    //map details
    let map = new window.mapboxgl.Map({
        container: this.map,
        center:[this.state.lat, this.state.lng],
        style: 'mapbox://styles/vamplife/cj8om9bgf8tm92ro2i66lz2uh',
        positionOptions: {
            enableHighAccuracy: true
        },
          trackUserLocation: true
    });

    // Add geolocate control to the map.
    map.addControl(new window.mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
      trackUserLocation: true,
    }));
  }

  render(){

    console.log(this.state.lat, this.state.lng)

    return(

        <div className='mapStyle' ref={el => this.map = el}></div>

    )
  }
}

export default Map;
