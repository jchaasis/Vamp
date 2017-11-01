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

export function splitTime(time){
  //set the hours
  let hours = Math.floor(time / 60);

  //set the minutes
  let minutes = time % 60;


  if (minutes === 0){
    minutes = '00'
  }

  return `${hours}:${minutes}`;
}


export function replaceTime(time) {
  //set the hours
  let hours = Math.floor(time / 60);

  //set the minutes
  let minutes = time % 60;

  //set am or pm
  const ampm = hours >= 12 ? 'pm' : 'am';

  if (hours > 12) {
    hours -= 12;
  }

  if (minutes === 0){
    minutes = '00'
  }

  return `${hours}:${minutes} ${ampm}`;
}


export function convertTime(time){
  //split the time at the colons
  let splitTime = time.split(':');

  let meridies ; // used to store am or pm

  //remove the seconds
  splitTime.splice(2, 1)

  //convert afternoon time
  if (parseInt(splitTime[0]) > 12){
    meridies = 'pm'
    splitTime[0] = (parseInt(splitTime[0]) - 12).toString();//Convert the hours into a number then subtract 12. After calculating the new number, convert back to a string.
  } else {
    //add am to the morning time
    meridies = 'am'
  }
  //return the final result
  return(splitTime.join(':') + meridies)
}
