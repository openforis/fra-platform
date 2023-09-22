import { ActivityLogMessage, OriginalDataPoint } from 'meta/assessment'

export const diffYear = (odpA: OriginalDataPoint, odpB: OriginalDataPoint) => {
  if (odpA.year !== odpB.year) {
    return {
      diff: { field: 'year', before: odpB.year, after: odpA.year },
      newMessage: ActivityLogMessage.originalDataPointUpdateYear,
    }
  }
  return undefined
}
