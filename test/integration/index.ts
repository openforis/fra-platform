import userCreate from './user/userCreate.test'
import userInactive from './user/userSetInactive.test'
import userActive from './user/userSetActive.test'
import assessmentCreate from './assessment/createAssessment'
import settingsDefaultAssessment from './settings/defaultAssessment'
import assessmentRemove from './assessment/removeAssessment'
import userRemove from './user/userRemove.test'

userCreate()
userInactive()
userActive()
assessmentCreate()
settingsDefaultAssessment()
assessmentRemove()
userRemove()
