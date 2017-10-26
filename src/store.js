import { createStore } from 'redux';


function reducer(state, action){
  console.log(action)
  //if we are updating the list of available events
  if (action.type === 'DISPLAY'){
    return{
      events: action.payload,
      location: state.location,
      filter: state.filter,
    }
  }
//if we are updating the current location
  if (action.type === 'CURRENT'){
    console.log(action.payload)
    return{
      events: state.events,
      location: action.payload,
      filter: state.filter,
    }
  }
//we are filtering the events
  if (action.type === 'FILTER'){
    return{
      events: state.events,
      location: state.locations,
      filter: action.payload,
    }
  }

  return state;
}

export default createStore(reducer, {
  events: [],
  location: null,
  filter: undefined,

},
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
