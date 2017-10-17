import React, { Component } from 'react';

class EventForm extends Component{
  constructor(props){
    super(props)

    //store the event data in the local state as users fill out the form.
    this.state = {

      //create event object to pass along
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
  //send the new infor to the database
  sendEvent(){
    fetch(`https://vamp-app.herokuapp.com/events`, {
             method: 'POST',
             headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify({

                        event: this.state.event,

             }),
         }).then(() => {
          console.log('hello')//  this.props.display(); //update the data in the store
  })
}

//handle the description
handleDescription(ev){

    let input = ev.target.value; //shortened for validation purposes

    this.setState({
      event: {
        description: ev.target.value,
        category: this.state.event.category,
        start: this.state.event.start,
        stop: this.state.event.stop,
        location: this.state.event.location,
      }
    })
  }

  //when a value is clicked, update the category of the event
 handleCategory(ev){

  this.setState({
    event: {
      description: this.state.event.description,
      category: ev.target.value,
      start: this.state.event.start,
      stop: this.state.event.stop,
      location: this.state.event.location,
    }
  })
  }
//handle start time
handleStart(ev){
  this.setState({
    event: {
      description: this.state.event.description,
      category: this.state.event.category,
      start: ev.target.value,
      stop: this.state.event.stop,
      location: this.state.event.location,
    }
  })
}

//handle stop time
handleStop(ev){
    this.setState({
      event: {
        description: this.state.event.description,
        category: this.state.event.category,
        start: this.state.event.start,
        stop: ev.target.value,
        location: this.state.event.location,
      }
    })
  }

  //handle location
   //TODO: geocode location if they provide an address
handleLocation(ev){
    this.setState({
      event: {
        description: this.state.event.description,
        category: this.state.event.category,
        start: this.state.event.start,
        stop: this.state.event.stop,
        location: ev.target.value,
      }
    })
}

//when the form is submitted,
handleAdd(description, category, start, stop, location){
    console.log(this.state.event)
    let details = this.state.event //shortened for ease of use below

    fetch(`https://vamp-app.herokuapp.com/events`, {
             method: 'POST',
             headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify({

                        description: details.description,
                        category: details.category,
                        eventStart: details.start,
                        eventEnd: details.stop,
                        location: details.location,

             }),
         })

      // this.setState({
      //   event:{
      /
      //   }
      // }, () => {
      //   console.log(this.state.event);
      //   this.props.toggleForm();
      // })
      // .then(()=>{
      //   this.sendEvent()
      // })

}

  render(){

    //establish blank variables to be used to gather information for the event.

    return(
      <div className='eventForm'>
        <label>Description: </label>
        <input type='text' onChange={ ev => this.handleDescription(ev)} maxLength='70'/>
        <button className="closeForm" onClick={() => this.props.toggleForm()}> X </button>
        <br/>
        <label>Category: </label>
        <select value={this.state.category} onChange={ev=> this.handleCategory(ev)}>
          <option value='Sports/Outdoors'> Sports/Outdoors </option>
          <option value='Music/Art'> Music/Art </option>
          <option value='Food/Bev'> Food/Bev </option>
          <option value='Community'> Community </option>
        </select>
        <br/>
        <label>Start: </label>
        <input type='time'onChange={ev => this.handleStart(ev)}/>
        <br/>
        <label>Stop: </label>
        <input type='time' onChange={ev => this.handleStop(ev)}/>
        <br/>
        <label>Location: </label>
        <input type='text' onChange={ev => this.handleLocation(ev)}/>
        <br/>
        <button onClick={()=> this.handleAdd()}> Add </button>
      </div>
    )
  }
}

export default EventForm;
