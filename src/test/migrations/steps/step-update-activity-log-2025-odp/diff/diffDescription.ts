import { ActivityLogMessage, OriginalDataPoint } from 'meta/assessment'

export const diffDescription = (odpA: OriginalDataPoint, odpB: OriginalDataPoint) => {
  if (odpA.description !== odpB.description) {
    return {
      diff: { field: 'description', before: odpB.description, after: odpA.description },
      newMessage: ActivityLogMessage.originalDataPointUpdateDescription,
    }
  }
  return undefined
}
