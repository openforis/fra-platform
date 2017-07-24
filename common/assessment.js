export const getAllowedStatusTransitions = currentState => {
  switch (currentState) {
    case 'editing':
      return {next: 'review'}
    case 'review':
      return {previous: 'editing', next: 'accepted'}
    case 'accepted':
      return {previous: 'review', next: 'editing'}
    case 'changing': //System's in the middle of changing the state
      return {}
    default:
      return  {next: 'review'}
  }
}
