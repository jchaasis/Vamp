import { createStore } from 'redux';


function reducer(state, action){
  console.log(action)

  if (action.type === 'DISPLAY'){
    console.log(action.payload)
    return{
      events: action.payload,
    }
  }

  return state;
}

export default createStore(reducer, {
  events: []

},
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
