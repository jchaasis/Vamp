import React, { Component } from 'react';
import Marker from './Marker';

class Map extends Component {
  constructor(props){
    super(props);

    this.state = {
      lat: 0,
      lng: 0,
      addMark: [],
    }
  }

  //set the state of the current location.

  updateLocation(latitude, longitude){

    this.setState({
      lat: latitude,
      lng: longitude,
    })
  }

  //get our currenc location and watch to see if it updates
  getLocation(){

    let current = navigator.geolocation.watchPosition(position => {
        this.updateLocation(position.coords.latitude, position.coords.longitude);

    })

  }

  // componentWillMount(){
  //   this.getLocation().then((results)=> {
  //     console.log(results)})
  // }


  componentDidMount(){
    //access Token for map
    window.mapboxgl.accessToken = 'pk.eyJ1IjoidmFtcGxpZmUiLCJhIjoiY2o4bHM5YmxpMHIxcjJwanNjdzZnb3ZqdSJ9.vIPUzwa3sv1H3X0CfSbchg';
    //map details
    this.map = new window.mapboxgl.Map({
        container: 'map',
        center:[this.state.lat, this.state.lng],
        style: 'mapbox://styles/vamplife/cj8om9bgf8tm92ro2i66lz2uh',
        positionOptions: {
            enableHighAccuracy: true
        },
          trackUserLocation: true
    });

    // Add geolocate control to the map.
    this.map.addControl(new window.mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
      trackUserLocation: true,
    }));
  
    // let point = <div className='marker'></div>
    fetch("https://vamp-app.herokuapp.com/events")
      .then(resp => resp.json())
      .then(response => {
        console.log(response)
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

  render(){

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
