import React, { Component } from 'react';



class Map extends Component {
  constructor(props){
    super(props);

    // this.state = {
    //   lat: 0,
    //   lng: 0,
    // }
  }

  componentDidMount(){
    // let watchID = navigator.geolocation.watchPosition(function(position){
    //   this.setState({
    //     lat: position.coords.latitude,
    //     lng: position.coords.longitude,
    //   })
    // })

    //accessToken
    window.mapboxgl.accessToken = 'pk.eyJ1IjoidmFtcGxpZmUiLCJhIjoiY2o4bHM5YmxpMHIxcjJwanNjdzZnb3ZqdSJ9.vIPUzwa3sv1H3X0CfSbchg';

    this.map = new window.mapboxgl.Map({
        container: this.mapContainer,
        // center:[lng, lat]
        style: 'mapbox://styles/vamplife/cj8om9bgf8tm92ro2i66lz2uh',
    });
  }

  render(){

    // let mapDimension = {
    //   width: '100%',
    //   height: '500px',
    // }

    return(

        <div  className='mapStyle'  ref={el => this.mapContainer = el}></div>

    )
  }
}

export default Map;
