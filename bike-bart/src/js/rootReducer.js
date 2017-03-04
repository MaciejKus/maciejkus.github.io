import { combineReducers } from 'redux'
import userAddress from './search-bar/reducer'
import station from './station/reducer'
import toBart from './map/reducer'
import bartInfo from './bart-info/reducer'

const rootReducer = combineReducers({
  userAddress,
  station,
  toBart,
  bartInfo
})

export default rootReducer
