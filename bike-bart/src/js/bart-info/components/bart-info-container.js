import { connect } from 'react-redux'
import BartInfo from './bart-info'
import { updateStartTime } from '../actions'

const mapStateToProps = (state) => {
  return {
    orgStation: {
      name: state.station.orgStation.name,
      abbr: state.station.orgStation.abbr
    },
    dstStation: {
      name: state.station.dstStation.name,
      abbr: state.station.dstStation.abbr
    },
    departTime: state.userAddress.departTime,
    orgTime: state.toBart.timeToBart,
    dstTime: state.toBart.timeFromBart,
    times: state.bartInfo.times
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    newTime: (time, orgAbbr, dstAbbr, departTime) => {
      dispatch(updateStartTime(time, orgAbbr, dstAbbr, departTime));
    }
  }
};

const BartInfoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BartInfo);

export default BartInfoContainer
