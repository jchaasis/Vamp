//This file will be used to store functions that may be called in multiple files, or to store functions to shorten the code in other coponent files.

export function sortTime(events){

  //array to store the events that are availableEvents
  const sortedEvents = [];

  //get the current time
  let d = new Date()

  //store the current hr and minute to use for comparison
  let currHr = d.getHours()
  let currMin = d.getMinutes()

  //iterate through the events endtimes.
  for (let i = 0; i < events.length; i++){
    // if (events[i].endTime)
    //split the time into an array so that we can compare the event hrs and the event minutes with the current hrs and current minutes
    let splitTimes = events[i].eventEnd.split(':');

    //shortened for comparison
    let eventEndHr = parseInt(splitTimes[0]);
    let eventEndMin = parseInt(splitTimes[1]);

    //if the event end hr is greater than the current hr, it is an event that should show up on the map so push it to the events. If the event end hr is equal to the current hr and the event end min is greater than the current minute, it should also show up on the map.


    if (eventEndHr > currHr ){
      sortedEvents.push(events[i])
    } else if (eventEndHr === currHr && eventEndMin > currMin){
      sortedEvents.push(events[i])
    }
  }

  return(sortedEvents)
}


export function sortCategory(events){
  //look to see if the state of the filter bar is clicked. If it is, get the value which is being used to filter and show only those events where the category matches.
  let category;


}
