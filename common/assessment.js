const R = require('ramda')

const assessmentStatusChangerRoles = ['REVIEWER', 'NATIONAL_CORRESPONDENT']

module.exports.getAllowedStatusTransitions = (mostPowerfulRole, currentState) => {
  if (!mostPowerfulRole || !R.contains(mostPowerfulRole.role, assessmentStatusChangerRoles)) return {}
  const isReviewer = mostPowerfulRole.role === 'REVIEWER'
  switch (currentState) {
    case 'editing':
      return {next: 'review'}
    case 'review':
      if (isReviewer) {
        return {previous: 'editing', next: 'accepted'}
      } else {
        return {previous: 'editing'}
      }
    case 'accepted': //In this state, only reviewer can do transition
      return isReviewer ? {previous: 'review'} : {}
    case 'changing': //System's in the middle of changing the state
      return {}
    default:
      return  {next: 'review'}
  }
}
