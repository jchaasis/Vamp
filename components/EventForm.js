import React, { Component } from 'react';

class EventForm extends Component{
  constructor(props){
    super(props)

    this.state = {
      category: '',
    }
  }

  handleCategory(ev){
      this.setState({
        category: ev.target.value,
      })
      console.log(this.state.category);
  }

  render(){

    return(
      <div className='eventForm'>
        <label>Description: </label>
        <input type='text'/>
        <br/>
        <label>Category: </label>
        <select value={this.state.category} onChange={event=> this.handleCategory(event)}>
          <option value={'Sports/Outdoors'}> Sports/Outdoors </option>
          <option value={'Music/Art'}> Music/Art </option>
          <option value={'Food/Bev'}> Food/Bev </option>
          <option value={'Community'}> Community </option>
        </select>
        <br/>
        <label>Start: </label>
        <br/>
        <label>Stop: </label>
        <br/>
        <label>Location: </label>
        <input type='text'/>
        <br/>
        <button> Add </button>
      </div>
    )
  }
}

export default EventForm;
