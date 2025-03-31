import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

export const diffYear = (odpA: OriginalDataPoint, odpB: OriginalDataPoint) => {
  if (odpA.year !== odpB.year) {
    return {
      diff: { field: 'year', before: odpB.year, after: odpA.year },
      newMessage: ActivityLogMessage.originalDataPointUpdateYear,
    }
  }
  return undefined
}
