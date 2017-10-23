import React, { Component } from 'react';
import Marker from './Marker';

class Map extends Component {
  constructor(props){
    super(props);

    this.state = {
<<<<<<< HEAD
      lat: null,
      lng: null,
=======
      lat: 0,
      lng: 0,
      addMark: [],
>>>>>>> points
    }
  }

  //set the state of the current location.

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
      })
    })
  }

  componentWillMount(){
    this.getLocation()
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

  

    //create a marker to designate the current location of the user.
    // let getCurrent=()=>{
    //   if (this.state.lng !== 0){
    //     let curr = document.createElement('div');//create div for the marker
    //     curr.className = 'marker';
    //
    //     const current = new window.mapboxgl.Marker(curr)
    //       .setLngLat([this.state.lng, this.state.lat])
    //       .addTo(this.map)
    //
    //       console.log(current)
    //   }
    // }

    // let point = <div className='marker'></div>
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
          .addTo(this.map);
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

        <div id='map' className='mapStyle' ref={el => this.map = el}>
          {/* <div className='marker' ref={el => this.map = el}></div> */}

        </div>

    )
  }
}

export default Map;
