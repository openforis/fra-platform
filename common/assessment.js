export const nextAssessmentState = currentState => {
  switch (currentState) {
    case 'editing':
      return 'review'
    case 'review':
      return 'accepted'
    case 'accepted':
      return 'editing'
    default:
      return 'review'
  }
}
