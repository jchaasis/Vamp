import { createStore } from 'redux';


function reducer(state, action){
  console.log(action)
  if (action.type === 'DISPLAY'){
    return{
      events: action.payload,
    }
  }

  if (action.type === 'CURRENT'){
    console.log(action.payload)
    return{
      events: state.events,
      location: action.payload
    }

  }

  return state;
}

export default createStore(reducer, {
  events: [],

},
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
