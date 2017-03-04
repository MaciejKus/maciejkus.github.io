const station = (state = {
  dstStation: {name: '', lat: 37.75, lng: -122.4 },
  orgStation: {name: '', lat: 37.75, lng: -122.4}},  action) => {
  switch(action.type) {
    case 'UPDATE_DST_STATION':
      return Object.assign({}, state, {
        dstStation: {
          address: action.address,
          lat: action.lat,
          lng: action.lng,
          abbr: action.abbr,
          name: action.name,
          status: 'done'
        }
        })
    case 'UPDATE_ORG_STATION':
      return Object.assign({}, state, {
        orgStation: {
          address: action.address,
          lat: action.lat,
          lng: action.lng,
          abbr: action.abbr,
          name: action.name,
          status: 'done'
        }
        })
    case 'WAIT_ORG_STATION':
      return Object.assign({}, state, {
        orgStation: {
          address: state.orgStation.address,
          lat: state.orgStation.lat,
          lng: state.orgStation.lng,
          abbr: state.orgStation.abbr,
          name: state.orgStation.name,
          status: 'waiting'
        }
        })
    case 'WAIT_DST_STATION':
      return Object.assign({}, state, {
        dstStation: {
          address: state.dstStation.address,
          lat: state.dstStation.lat,
          lng: state.dstStation.lng,
          abbr: state.dstStation.abbr,
          name: state.dstStation.name,
          status: 'waiting'
        }
        })
    default:
      return state;
  }
};

export default station
