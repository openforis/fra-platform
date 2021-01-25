import { combineReducers } from 'redux'
import { HomeState, HomeReducer } from './home'

export default combineReducers({
  [HomeState.stateKey]: HomeReducer,
})
