export const getAllowedStatusTransitions = (mostPowerfulRole, currentState) => {
  if (!mostPowerfulRole) return {}
  const isReviewer = mostPowerfulRole.role === 'REVIEWER'
  switch (currentState) {
    case 'editing':
      return {next: 'review'}
    case 'review':
      return {previous: 'editing', next: isReviewer ? 'accepted' : null}
    case 'accepted': //In this state, only reviewer can do transitions
      return isReviewer ? {previous: 'review', next: 'editing'} : {}
    case 'changing': //System's in the middle of changing the state
      return {}
    default:
      return  {next: 'review'}
  }
}
