import { connect } from 'react-redux'
import SearchBar from './search-bar'
import { fetchWithAddress } from '../actions';
import { updateDepartTime } from '../actions';

const mapStateToProps = (state) => {
  return {
    stat: state.userAddress.stat,
    dst: state.userAddress.dstAddress,
    org: state.userAddress.orgAddress
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (orgAddress, dstAddress, departTime) => {
      if(orgAddress.trim() || dstAddress.trim()) dispatch(fetchWithAddress(orgAddress, dstAddress))
      dispatch(updateDepartTime(departTime))
    }
  }
};

const SearchAddress = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar)

export default SearchAddress

