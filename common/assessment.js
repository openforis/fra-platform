const R = require('ramda')

const assessmentStatusChangerRoles = ['ADMINISTRATOR', 'REVIEWER', 'NATIONAL_CORRESPONDENT']

module.exports.getAllowedStatusTransitions = (role, currentState) => {
  if (!role || !R.contains(role.role, assessmentStatusChangerRoles)) return {}
  const acceptTransitionsAllowed = role.role === 'REVIEWER' || role.role === 'ADMINISTRATOR'
  switch (currentState) {
    case 'editing':
      return {next: 'review'}
    case 'review':
      if (acceptTransitionsAllowed) {
        return {previous: 'editing', next: 'accepted'}
      } else {
        return {previous: 'editing'}
      }
    case 'accepted': //In this state, only reviewer or admin can do transition
      return acceptTransitionsAllowed ? {previous: 'review'} : {}
    case 'changing': //System's in the middle of changing the state
      return {}
    default:
      return  {next: 'review'}
  }
}
