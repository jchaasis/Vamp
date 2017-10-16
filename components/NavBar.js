import React, { Component } from 'react';

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

  render(){

    if (this.state.visible === false){
      return(
        <div className='toggleNav'>
          <button onClick={() => this.toggleNav()}> Nav </button>
        </div>
      )
    } else {

      return(
          <div className='navBar'>
            <button onClick={() => this.toggleNav()}> close </button>
            <button> Add Event </button>
            <button> filter </button>
          </div>
      )
    }
  }
}

export default NavBar;
