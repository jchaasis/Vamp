import { createStore } from 'redux';


function reducer(state, action){
  console.log(action)

  return state;
}

export default createStore(reducer, {

},
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
