import component from '@webapp/app/appView'

import assessment from '@webapp/app/assessment/reducer'
import extentOfForest from '@webapp/app/assessment/fra/sections/extentOfForest/reducers'
import forestCharacteristics from '@webapp/app/assessment/fra/sections/forestCharacteristics/reducer'
import growingStock from '@webapp/app/assessment/fra/sections/growingStock/reducer'
import originalDataPoint from '@webapp/app/assessment/fra/sections/originalDataPoint/reducers'
import autoSave from '@webapp/app/components/autosave/reducer'
import navigation from '@webapp/app/components/navigation/reducer'
import traditionalTable from '@webapp/app/assessment/components/traditionalTable/reducer'
import review from '@webapp/app/assessment/components/review/reducer'
import userManagement from '@webapp/app/user/userManagement/reducer'
import landing from '@webapp/app/countryLanding/reducer'
import panEuropeanIndicators from '@webapp/app/assessment/panEuropean/sections/indicators/reducer'
import admin from '@webapp/pages/Admin/reducer'
import userChat from '@webapp/app/user/chat/reducer'
import countryMessageBoard from '@webapp/app/countryLanding/views/messageBoard/reducer'

import * as AssessmentState from '@webapp/app/assessment/assessmentState'
import * as OriginalDataPointState from '@webapp/app/assessment/fra/sections/originalDataPoint/originalDataPointState'
import * as AutosaveState from '@webapp/app/components/autosave/autosaveState'
import * as ReviewState from '@webapp/app/assessment/components/review/reviewState'
import * as UserManagementState from '@webapp/app/user/userManagement/userManagementState'

import * as LandingState from '@webapp/app/countryLanding/landingState'
import * as AdminState from '@webapp/pages/Admin/adminState'
import * as NavigationState from '@webapp/app/components/navigation/navigationState'

// TODO: Add for each file '<module>/state.js and add state key as ex.:
// { name: HomeState.stateKey, fn: homeReducer },

const reducers = [
  { name: AssessmentState.stateKey, fn: assessment },
  // todo: USED ONLY by content check
  { name: 'extentOfForest', fn: extentOfForest },
  { name: 'forestCharacteristics', fn: forestCharacteristics },
  { name: 'growingStock', fn: growingStock },

  { name: OriginalDataPointState.stateKey, fn: originalDataPoint },
  { name: AutosaveState.stateKey, fn: autoSave },

  { name: NavigationState.stateKey, fn: navigation },
  { name: 'traditionalTable', fn: traditionalTable },
  { name: ReviewState.stateKey, fn: review },
  { name: UserManagementState.stateKey, fn: userManagement },
  { name: LandingState.stateKey, fn: landing },
  { name: 'panEuropeanIndicators', fn: panEuropeanIndicators },
  { name: 'userChat', fn: userChat },
  { name: 'countryMessageBoard', fn: countryMessageBoard },
  { name: AdminState.stateKey, fn: admin },
]

export { component, reducers }
