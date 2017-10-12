import React, { Component } from 'react';

class EventForm extends Component{
  constructor(props){
    super(props)

    //store the event data in the local state as users fill out the form.
    this.state = {

      //create event object to pass along
      visible: false,

      event:{
        description: '',
        category:'',
        start: '',
        stop: '',
        location: {
          lat:'',
          long:''
        },
      },
      //to be used if we need to display an error message due to invalid input
      error: '',
    }
  }
  //collect the value of the description input
  // //TODO: add profinity validator.
  // handleDescription(ev){
  //
  //   let input = ev.target.value; //shortened for validation purposes
  //
  //   this.setState({
  //     event: {
  //       description: input,
  //       category: this.state.event.category,
  //       start: this.state.event.start,
  //     }
  //   })
  // }
  //
  // //when a value is clicked, update the category of the event
  // handleCategory(ev){
  //   this.setState({
  //     event: {
  //       description: this.state.event.description,
  //       category: ev.target.value,
  //     }
  //   })
  //
  // }

  handleAdd(description, category, start, stop, location){

      this.setState({
        event:{
          description: description,
          category: category,
          start: start,
          stop: stop,
          location: location,
        }
      })

    //upon updating the state, we will post the data to the server.
    console.log(this.state.event);
  }

  render(){

    //establish blank variables
    let description;
    let category;
    let start;
    let stop;
    let location;

    return(
      <div className='eventForm'>
        <label>Description: </label>
        <input type='text' onChange={ ev => description = ev.target.value} maxLength='70'/>
        <br/>
        <label>Category: </label>
        <select value={this.state.category} onChange={ev=> category = ev.target.value}>
          <option value='Sports/Outdoors'> Sports/Outdoors </option>
          <option value='Music/Art'> Music/Art </option>
          <option value='Food/Bev'> Food/Bev </option>
          <option value='Community'> Community </option>
        </select>
        <br/>
        <label>Start: </label>
        <input type='time'onChange={ev => start = ev.target.value}/>
        <br/>
        <label>Stop: </label>
        <input type='time' onChange={ev => stop = ev.target.value}/>
        <br/>
        <label>Location: </label>
        <input type='text' onChange={ev => location = ev.target.value}/>
        <br/>
        <button onClick={()=> this.handleAdd(description, category, start, stop, location)}> Add </button>
      </div>
    )
  }
}

export default EventForm;
