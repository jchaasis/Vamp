import React, { Component } from 'react'

class LocationResult extends Component{

  render(){
    return(
      <li> {this.props.location.place_name}</li>
    )
  }
}

export default LocationResult
