const {isAdministrator, isReviewer, isCollaborator, roleForCountry} = require('./countryRole')

module.exports.getAllowedStatusTransitions = (countryIso, userInfo, currentState) => {
  // collaborator cannot change the status of the assessment
  if (isCollaborator(countryIso, userInfo))
    return {}

  switch (currentState) {
    // all other roles can submit to review
    case 'editing':
      return {next: 'review'}
    case 'review':
      return isAdministrator(userInfo) || isReviewer(countryIso, userInfo)
        ? {previous: 'editing', next: 'accepted'}
        : {}
    //In accepted or final states, only admin can do transition
    case 'accepted':
      return isAdministrator(userInfo)
        ? {previous: 'review', next: 'final'}
        : {}
    case 'final':
      //In this state, only admin can do transition
      return isAdministrator(userInfo)
        ? {previous: 'accepted'}
        : {}
    case 'changing': //System's in the middle of changing the state
      return {}
    default:
      return {next: 'review'}
  }
}
