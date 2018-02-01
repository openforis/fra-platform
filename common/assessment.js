const {isAdministrator, isNationalCorrespondent, isReviewer, isCollaborator} = require('./countryRole')

module.exports.getAllowedStatusTransitions = (countryIso, userInfo, currentState) => {
  // collaborator cannot change the status of the assessment
  if (!userInfo || isCollaborator(countryIso, userInfo))
    return {}

  switch (currentState) {
    case 'review': // in review, only reviewer can do transitions
      return isAdministrator(userInfo) || isReviewer(countryIso, userInfo)
        ? {previous: 'editing', next: 'approval'}
        : {}

    //In approval or accepted, only admin can do transitions
    case 'approval':
      return isAdministrator(userInfo)
        ? {previous: 'review', next: 'accepted'}
        : {}

    case 'accepted':
      return isAdministrator(userInfo)
        ? {previous: 'approval'}
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
