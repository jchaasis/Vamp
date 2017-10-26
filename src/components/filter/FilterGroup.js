import React, { Component } from 'react';

//import components
import FilterButton from './FilterButton';

//import actions
import { filterCategory, displayEvents } from '../../actions'
//import from redux
import { connect } from 'react-redux'

//import miscelaneous functions
import { sortTime }from '../../util'


class RadioGroup extends Component {
  constructor(props){
    super(props)

    this.state = {
      filter: false,
    }
  }

  handleClick(value){
    //when a button is clicked, store the value that was clicked in redux so we can access it in the map

    this.props.filter(value);

    console.log(this.props.category);
    this.props.display()
  }

  render(){

    let options = ['Sports/Outdoors', 'Music/Art', 'Food/Bev', 'Community', 'Show All']
    //create a list of radio buttons based off of the available categories
    let buttons = options.map((option, index) => <FilterButton key={index} value={option} handleClick={ev=>this.handleClick(ev)} />)

    return(

      <ul>
        {buttons}
      </ul>

    )
  }
}

function mapState2Props(state){
  return{
    category: state.filter,
  }
}

function mapDispatch2Props(dispatch){
  return{
    filter: category => dispatch(filterCategory(category)),
    display: function(){
      fetch("https://vamp-app.herokuapp.com/events")
      .then(resp => resp.json())
      .then (resp => sortTime(resp))
      .then( resp => dispatch(displayEvents(resp)))
    },
  }
}

export default connect(mapState2Props, mapDispatch2Props) (RadioGroup);
