import { connect } from 'react-redux'
import GMap from './map'
import React from 'react'
import { addToBartTime } from '../actions'
import { addBartDirectionDsts } from '../actions'

const mapStateToProps = (state) => {
  return {
    org: {
      lat: state.station.dstStation.lat,
      lng: state.station.dstStation.lng,
      status: state.station.dstStation.status
    }, dst: {
      lat: state.userAddress.dstAddress.lat,
      lng: state.userAddress.dstAddress.lng,
      status: state.userAddress.dstAddress.status
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTime: (value, text) => {
      dispatch(addToBartTime(value, text, 'UPDATE_TIME_FROM_BART'));
    },
    addDirections: (array) => {
      dispatch(addBartDirectionDsts(array, 'UPDATE_DIRECTIONS_DST'));
    }
  }
};

const GoogleMap = connect(
  mapStateToProps,
  mapDispatchToProps
)(GMap);

export default GoogleMap
/*
const GoogleMap = () => (
 <div>map</div>
)

export default GoogleMap
*/
