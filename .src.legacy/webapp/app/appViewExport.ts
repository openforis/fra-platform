import component from '@webapp/pages/Assessment'

import assessment from '@webapp/app/assessment/reducer'
import review from '@webapp/app/assessment/components/review/reducer'
import userManagement from '@webapp/app/user/userManagement/reducer'
import landing from '@webapp/app/countryLanding/reducer'
import userChat from '@webapp/app/user/chat/reducer'
import countryMessageBoard from '@webapp/app/countryLanding/views/messageBoard/reducer'

import * as AssessmentState from '@webapp/app/assessment/assessmentState'
import * as ReviewState from '@webapp/app/assessment/components/review/reviewState'
import * as UserManagementState from '@webapp/app/user/userManagement/userManagementState'

import * as LandingState from '@webapp/app/countryLanding/landingState'
import { NavigationReducer } from '@webapp/store/navigation'
import { AutosaveReducer } from '@webapp/store/autosave'

// TODO: Add for each file '<module>/state.js and add state key as ex.:
// { name: HomeState.stateKey, fn: homeReducer },

const reducers = [
  { name: AssessmentState.stateKey, fn: assessment },

  { name: 'autosave', fn: AutosaveReducer },

  { name: 'navigation', fn: NavigationReducer },
  { name: ReviewState.stateKey, fn: review },
  { name: UserManagementState.stateKey, fn: userManagement },
  { name: LandingState.stateKey, fn: landing },
  { name: 'userChat', fn: userChat },
  { name: 'countryMessageBoard', fn: countryMessageBoard },
]

export { component, reducers }
