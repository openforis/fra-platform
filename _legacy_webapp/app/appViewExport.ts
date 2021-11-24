import component from '../pages/Assessment'

import assessment from '../app/assessment/reducer'
import review from '../app/assessment/components/review/reducer'
import userManagement from '../app/user/userManagement/reducer'
import landing from '../app/countryLanding/reducer'
import userChat from '../app/user/chat/reducer'
import countryMessageBoard from '../app/countryLanding/views/messageBoard/reducer'

import * as AssessmentState from '../app/assessment/assessmentState'
import * as ReviewState from '../app/assessment/components/review/reviewState'
import * as UserManagementState from '../app/user/userManagement/userManagementState'

import * as LandingState from '../app/countryLanding/landingState'
import { NavigationReducer } from '../store/navigation'
import { AutosaveReducer } from '../store/autosave'

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
