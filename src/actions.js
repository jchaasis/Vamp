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

export function filterCategory(category){
  return{
    type: 'FILTER',
    payload: category,
  }
}
