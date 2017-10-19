import React, { Component } from 'react';

import Filter from './Filter'

class NavBar extends Component{

  constructor(props){
    super(props);

    this.state = {
      visible: false,
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

  render(){

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
            <button onClick={() => this.toggleNav()} className='closeButton'> <div className='navBarBars'>
            &#8213;
            <br/>
            &#8213;
            <br/>
            &#8213;
            </div> </button>
            <button onClick={() => this.toggleEventForm()}> Add Event </button>
            <button> filter </button>

          </div>
      )
    }
  }
}

export default NavBar;
