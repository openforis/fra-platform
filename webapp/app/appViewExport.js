import component from '@webapp/pages/Assessment'

import assessment from '@webapp/app/assessment/reducer'
import originalDataPoint from '@webapp/app/assessment/fra/sections/originalDataPoint/reducers'
import autoSave from '@webapp/app/components/autosave/reducer'
import navigation from '@webapp/app/components/navigation/reducer'
import review from '@webapp/app/assessment/components/review/reducer'
import userManagement from '@webapp/app/user/userManagement/reducer'
import landing from '@webapp/app/countryLanding/reducer'
import admin from '@webapp/store/admin/reducer'
import userChat from '@webapp/app/user/chat/reducer'
import countryMessageBoard from '@webapp/app/countryLanding/views/messageBoard/reducer'

import * as AssessmentState from '@webapp/app/assessment/assessmentState'
import * as OriginalDataPointState from '@webapp/app/assessment/fra/sections/originalDataPoint/originalDataPointState'
import * as AutosaveState from '@webapp/app/components/autosave/autosaveState'
import * as ReviewState from '@webapp/app/assessment/components/review/reviewState'
import * as UserManagementState from '@webapp/app/user/userManagement/userManagementState'

import * as LandingState from '@webapp/app/countryLanding/landingState'
import * as AdminState from '@webapp/store/admin/adminState'
import * as NavigationState from '@webapp/app/components/navigation/navigationState'

// TODO: Add for each file '<module>/state.js and add state key as ex.:
// { name: HomeState.stateKey, fn: homeReducer },

const reducers = [
  { name: AssessmentState.stateKey, fn: assessment },

  { name: OriginalDataPointState.stateKey, fn: originalDataPoint },
  { name: AutosaveState.stateKey, fn: autoSave },

  { name: NavigationState.stateKey, fn: navigation },
  { name: ReviewState.stateKey, fn: review },
  { name: UserManagementState.stateKey, fn: userManagement },
  { name: LandingState.stateKey, fn: landing },
  { name: 'userChat', fn: userChat },
  { name: 'countryMessageBoard', fn: countryMessageBoard },
  { name: AdminState.stateKey, fn: admin },
]

export { component, reducers }
