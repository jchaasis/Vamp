import React, { Component } from 'react';

//import from redux
import { connect } from 'react-redux';

//import components
import SingleEvent from './SingleEvent';



class EventsTable extends Component {
  constructor(props){
    super(props)

    this.state = {
      list: false,
    }
  }

  handleTableToggle(){
    this.setState({
      list: !this.state.list,
    })
    console.log(this.state.list)

  }



  render(){

    let availableEvents;
      //if the filter category in the store is undefined, display all events, if not filter the events and display only those matching the category
    if (this.props.filter === 'Show All'){

      availableEvents = this.props.events

    } else {

      availableEvents = this.props.events.filter(event => event.category === this.props.filter)

    }

    //create an events row for each of the events in the database.
    let events = availableEvents.map((event, index) => <SingleEvent key={index} details={event} />)

    //set the className for the table based off of the state. This will either show or hide the events table
    let styleName = this.state.list ? 'visibleTable' : 'hiddenTable'

    //set the content of the div based off of the state. This will either show or hide the table itself.
    let content;
    //
    if (this.state.list === true){
      content =
      <table className="eventsTable">
        <tbody>
          <tr>
            <th>
              Description
            </th>
            <th>
              Category
            </th>
            <th>
              Location
            </th>
            <th>
              Start Time
            </th>
            <th>
              End Time
            </th>
          </tr>
          {events}
        </tbody>
      </table>

    } else {
      content = null;
    }

    return(
      <div  className={styleName}>
      <button onClick={()=>this.handleTableToggle()}> List View </button>

      {content}

      </div>
    )
  }
}

function mapState2Props(state){
  return{
    events: state.events,
    filter: state.filter,
  }
}

export default connect(mapState2Props, null) (EventsTable);
