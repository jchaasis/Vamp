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


// function splitTime(time, x){
  //split the number string into an array of individual numbers
// let splitTime = time.split('')
  //add a colon after index x
//   splitTime.splice(x, 0, ':')
    //return the colonized time
//   return splitTime.join('')
// }

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


//
// export function firstTime(time){
//   //variable to store the final result
//   let finalTime;
//
//   let displayTime;
//
//   //function to add a colon to the time TODO: make this its own unique function above, and then
//     // function splitTime(time, x){
//       //split the time into an array of all the numbers
//      let splitTime = time.split('')
//       //add a colon at index x
//       splitTime.splice(x, 0, ':')
//
//       //join the array into a single time
//      let colonizedTime = splitTime.join('')
//
//      //return the newly colonized time to be used
//      return (colonizedTime)
//     }
//
//   if (time.length === 2){
//
//   } else if (time.length === 3){
//
//     //run the splittime function to add a colon
//     splitTime(time, 1)
//
//     //add am to the string
//     finalTime = splitTime(time, 1) + ' am'
//
//   } else if (time.length === 4){
//
//     displayTime = splitTime(time, 2);
//
//     //seperate the time if it is 4 characters long to find out if it is am or pm
//     let seperatedTime = displayTime.split(':');
//
//       if (parseInt(seperatedTime[0]) > 12 ){
//         //parse hr into an integer subtract 12 and return to a string
//         seperatedTime[0] = (parseInt(seperatedTime[0]) - 12).toString() ;
//
//         //its in the afternoon so join the elements and add pm
//         finalTime = seperatedTime.join(':') + ' pm';
//
//       } else if (parseInt(seperatedTime[0]) === 12){
//
//         finalTime = seperatedTime.join(':') + ' pm';
//       } else {
//         //it is still in the morning so join the items and add am
//         finalTime = (seperatedTime.join(':') + ' am');
//
//       }
//
//   }
//   return(finalTime)
// }
