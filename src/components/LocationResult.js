import React, { Component } from 'react'

class LocationResult extends Component{

  handleClick(location){
    this.props.updateLocation(location)
  }

  render(){
    return(
      <li onClick={()=> this.handleClick(this.props.location)}> {this.props.location.place_name}</li>
    )
  }
}

export default LocationResult;
