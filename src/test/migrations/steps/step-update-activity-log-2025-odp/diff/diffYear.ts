import { ActivityLogMessage, OriginalDataPoint } from 'meta/assessment'

export const diffYear = (odpA: OriginalDataPoint, odpB: OriginalDataPoint) => {
  if (odpA.year !== odpB.year) {
    return {
      diff: {
        field: 'year',
        before: odpA.year,
        after: odpB.year,
      },
      newMessage: ActivityLogMessage.originalDataPointUpdateYear,
    }
  }
  return undefined
}
