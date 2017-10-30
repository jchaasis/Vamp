import React, { Component } from 'react';

import { connect } from 'react-redux';

class FilterButton extends Component {

  render(){
    //if the filtered category matches the value of the list item, we will give it different styling
    let itemStyle = this.props.value === this.props.category ? 'activeFilterItem' : 'filterItem'

    return(

      <li className={itemStyle} onClick={()=> this.props.handleClick(this.props.value)} >
        {this.props.value}
      </li>
    )
  }
}

function mapState2Props(state){
  return{
    category: state.filter,
  }
}

export default connect(mapState2Props, null) (FilterButton);
