import React, { Component } from 'react';

class FilterButton extends Component {

  render(){

    return(

      <li onClick={()=> this.props.handleClick(this.props.value)} >
        {this.props.value}
      </li>
    )
  }
}

export default FilterButton;
