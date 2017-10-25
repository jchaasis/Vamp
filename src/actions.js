export function displayEvents(dispEvents){
  return{
    type:'DISPLAY',
    payload: dispEvents
  }
}

export function getCurrentLoc(location){
  return{
    type: 'CURRENT',
    payload: location
  }
}

export function sortTime(events){
  console.log(events)

  //array to store the events that are availableEvents
  const sortedEvents = [];

  //get the current time
  let d = new Date()

  //store the current hr and minute to use for comparison
  let currHr = d.getHours()
  let currMin = d.getMinutes()
  console.log(currHr, currMin)

  //iterate through the events endtimes.
  for (let i = 0; i < events.length; i++){
    // if (events[i].endTime)
    //split the time into an array so that we can compare the event hrs and the event minutes with the current hrs and current minutes
    let splitTimes = events[i].eventEnd.split(':');

    //shortened for comparison
    let eventEndHr = splitTimes[0];
    let eventEndMin = splitTimes[1];

    //if the event end hr is greater than the current hr, it is an event that should show up on the map so push it to the events. If the event end hr is equal to the current hr and the event end min is greater than the current minute, it should also show up on the map.
    if (eventEndHr > currHr ){
      sortedEvents.push(events[i])
    } else if (eventEndHr == currHr && eventEndMin > currMin){
      sortedEvents.push(events[i])
    }
  }

  console.log(sortedEvents)
  return(sortedEvents)
  // let availableEvents = events.filter(event)
}
