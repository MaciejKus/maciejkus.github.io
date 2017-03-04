const bartInfo = ( state = { times: []}, action) => {
  switch(action.type) {
   case 'UPDATE_DEPARTURE_TIMES':
     return Object.assign({}, state, {
       times: action.times
     })
   default:
     return state;
  }
};

export default bartInfo
