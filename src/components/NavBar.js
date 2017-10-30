import React, { Component } from 'react';

import Filter from './filter/Filter'

import Legend from './Legend';


class NavBar extends Component{

  constructor(props){
    super(props);

    this.state = {
      visible: false,
      filter: false,
    }
  }

  //when the nav button is clicked, display the toolbar options. When the close button is clicked, hide the toolbar.
  toggleNav(){
    this.setState({
      visible: !this.state.visible,
    })
  }

  //when the add event button is clicked, trigger the addEvent function in app.js, therefore displaying the form.
  toggleEventForm(){
    this.props.toggleForm()
  }
  //toggle the visibility of the filter list when the button is clicked
  toggleFilter(){

    this.setState({
      filter: !this.state.filter,
    })
    console.log('filter open')
  }

  render(){
    //when the filter button is clicked, display the filter options
    let filterEvents = this.state.filter ? <Filter /> : null;


    if (this.state.visible === false){
      return(
        <div className='toggleNav'>
          <button className='navBarButton'onClick={() => this.toggleNav()}>
            <div className='navBarBars'>
            &#8213;
            <br/>
            &#8213;
            <br/>
            &#8213;
            </div>
          </button>
        </div>
      )
    } else {

      return(
          <div className='navBar'>
            <button onClick={() => this.toggleNav()} className='closeButton'> <p className='closeX'>
              X
            </p> </button>
            <button className='navButton' onClick={() => this.toggleEventForm()}> ADD EVENT </button>
            <button className='navButton' onClick={()=>this.toggleFilter()}> FILTER </button>
            {filterEvents}
            <button className='navButton' onClick={()=>this.props.toggleList()}> LIST VIEW </button>

          <Legend />

          </div>
      )
    }
  }
}

export default NavBar;
