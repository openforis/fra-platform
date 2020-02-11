import component from './appView'

import extentOfForest from '@webapp/loggedin/assessmentFra/extentOfForest/reducers'
import forestCharacteristics from '@webapp/loggedin/assessmentFra/forestCharacteristics/reducer'
import growingStock from '@webapp/loggedin/assessmentFra/growingStock/reducer'
import originalDataPoint from '../originalDataPoint/reducers'
import autoSave from '../autosave/reducer'
import navigation from './navigation/reducers'
import traditionalTable from '@webapp/traditionalTable/reducer'
import descriptions from '@webapp/description/reducers'
import review from './review/reducer'
import userManagement from '../userManagement/reducer'
import country from '../country/reducer'
import sustainableDevelopment from '@webapp/loggedin/assessmentFra/sustainableDevelopment/reducer'
import landing from '../landing/reducer'
import panEuropeanIndicators from '../panEuropeanIndicators/reducer'
import admin from './admin/reducer'
import userChat from './userChat/reducer'
import countryMessageBoard from './countryMessageBoard/reducer'

import * as OriginalDataPointState from '@webapp/originalDataPoint/originalDataPointState'
import * as AutosaveState from '@webapp/autosave/autosaveState'
// import * as DescriptionState from '@webapp/description/descriptionState'
import * as ReviewState from '@webapp/loggedin/review/reviewState'
import * as UserManagementState from '@webapp/userManagement/userManagementState'
import * as CountryState from '@webapp/country/countryState'
import * as LandingState from '@webapp/landing/landingState'
import * as AdminState from '@webapp/loggedin/admin/adminState'
// TODO: Add for each file '<module>/state.js and add state key as ex.:
// { name: HomeState.stateKey, fn: homeReducer },

const reducers = [
  { name: 'extentOfForest', fn: extentOfForest },
  { name: 'forestCharacteristics', fn: forestCharacteristics },
  { name: 'growingStock', fn: growingStock },

  { name: OriginalDataPointState.stateKey, fn: originalDataPoint },
  { name: AutosaveState.stateKey, fn: autoSave },

  { name: 'navigation', fn: navigation },
  { name: 'traditionalTable', fn: traditionalTable },
  { name: 'descriptions', fn: descriptions },
  { name: ReviewState.stateKey, fn: review },
  { name: UserManagementState.stateKey, fn: userManagement },
  { name: CountryState.stateKey, fn: country },
  { name: 'sustainableDevelopment', fn: sustainableDevelopment },
  { name: LandingState.stateKey, fn: landing },
  { name: 'panEuropeanIndicators', fn: panEuropeanIndicators },
  { name: 'userChat', fn: userChat },
  { name: 'countryMessageBoard', fn: countryMessageBoard },
  { name: AdminState.stateKey, fn: admin },
]

export { component, reducers }
