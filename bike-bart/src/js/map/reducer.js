const toBart = (state = {
    timeToBart: {text: '', time: 0}, 
    timeFromBart: {text: '', time: 0}, 
    dstDirections: [],
    orgDirections: []
  }, action) => {
  switch(action.type) {
    case 'UPDATE_TIME_TO_BART':
      return Object.assign({}, state, {
        timeToBart: action.timeBart
        })
    case 'UPDATE_TIME_FROM_BART':
      return Object.assign({}, state, {
        timeFromBart: action.timeBart
        })
    case 'UPDATE_DIRECTIONS_DST':
      return Object.assign({}, state, {
        dstDirections: action.directions
        })
    case 'UPDATE_DIRECTIONS_ORG':
      return Object.assign({}, state, {
        orgDirections: action.directions
        })
    default:
      return state;
  }
};

export default toBart
