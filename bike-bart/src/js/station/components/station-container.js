import { connect } from 'react-redux'
import Station from './station'

const mapStateToProps = (state) => {
  return {
   dstStation : state.station.dstStation,
   orgStation : state.station.orgStation
  }
};

const BartStation = connect(
  mapStateToProps
)(Station)

export default BartStation
