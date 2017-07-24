export const getNextAssessmentStatus = currentState => {
  switch (currentState) {
    case 'editing':
      return 'review'
    case 'review':
      return 'accepted'
    case 'accepted':
      return 'editing'
    case 'changing': //System's in the middle of changing the state
      return null
    default:
      return 'review'
  }
}
