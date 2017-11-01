import React, { Component } from 'react';

//import util functions
import { convertTime } from '../../util'

class SingleEvent extends Component {
  constructor(props){
    super(props)

    this.state = {
      address: '',
    }
  }

  getAddress(lng, lat){
    //using the lat and lng coordinates of the event location, find the address
    let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng}, ${lat}.json?access_token=pk.eyJ1IjoidmFtcGxpZmUiLCJhIjoiY2o4bHM5YmxpMHIxcjJwanNjdzZnb3ZqdSJ9.vIPUzwa3sv1H3X0CfSbchg`;
    //fetch matching results as a user types in a location.
    fetch(url)
      .then(resp => resp.json()) //parse the json
      .then(resp => {
        
          this.setState({
            address: resp.features[0].properties.address,
          })
        })
      }

    componentDidMount(){
      this.getAddress(this.props.details.longitude, this.props.details.latitude)
    }


  render(){

    let event = this.props.details;

    return(
      <tr>
        <td>
          {event.description}
        </td>
        <td>
          {event.category}
        </td>
        <td>
          {this.state.address}
        </td>
        <td>
          {convertTime(event.eventStart)}
        </td>
        <td>
          {convertTime(event.eventEnd)}
        </td>
      </tr>
    )
  }
}

export default SingleEvent;
