import { combineReducers } from 'redux'

import applicationError from '../applicationError/reducer'
import extentOfForest from '../assessmentFra/extentOfForest/reducers'
import forestCharacteristics from '../assessmentFra/forestCharacteristics/reducer'
import growingStock from '../assessmentFra/growingStock/reducer'
import originalDataPoint from '../originalDataPoint/reducers'
import autoSave from '../autosave/reducer'
import navigation from '../navigation/reducers'
import user from '../user/reducer'
import traditionalTable from '../traditionalTable/reducer'
import descriptions from '../description/reducers'
import review from '../review/reducer'
import userManagement from '../userManagement/reducer'
import country from '../country/reducer'
import sustainableDevelopment from '../assessmentFra/sustainableDevelopment/reducer'
import landing from '../landing/reducer'
import panEuropeanIndicators from '../panEuropeanIndicators/reducer'
import userChat from '../userChat/reducer'
import countryMessageBoard from '../countryMessageBoard/reducer'

export default combineReducers({
  applicationError,
  extentOfForest,
  forestCharacteristics,
  descriptions,
  originalDataPoint,
  autoSave,
  navigation,
  user,
  review,
  traditionalTable,
  growingStock,
  userManagement,
  country,
  sustainableDevelopment,
  landing,
  panEuropeanIndicators,
  userChat,
  countryMessageBoard
})
