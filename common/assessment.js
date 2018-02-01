const {isAdministrator, isNationalCorrespondent, isReviewer, isCollaborator} = require('./countryRole')

module.exports.getAllowedStatusTransitions = (countryIso, userInfo, currentState) => {
  // collaborator cannot change the status of the assessment
  if (isCollaborator(countryIso, userInfo))
    return {}

  switch (currentState) {
    case 'review': // in review, only reviewer can do transitions
      return isAdministrator(userInfo) || isReviewer(countryIso, userInfo)
        ? {previous: 'editing', next: 'accepted'}
        : {}

    //In accepted or final states, only admin can do transitions
    case 'accepted':
      return isAdministrator(userInfo)
        ? {previous: 'review', next: 'final'}
        : {}

    case 'final':
      return isAdministrator(userInfo)
        ? {previous: 'accepted'}
        : {}

    case 'changing': //System's in the middle of changing the state
      return {}

    case 'editing':
    default: // in editing or default only nationalCorrespondent can submit to review
      return isAdministrator(userInfo) || isNationalCorrespondent(countryIso, userInfo)
        ? {next: 'review'}
        : {}
  }
}
