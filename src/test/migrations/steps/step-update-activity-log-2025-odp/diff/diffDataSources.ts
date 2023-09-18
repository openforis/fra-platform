import { ActivityLogMessage, OriginalDataPoint } from 'meta/assessment'

export const diffDataSources = (odpA: OriginalDataPoint, odpB: OriginalDataPoint) => {
  const diffAdditionalComments = odpA.dataSourceAdditionalComments !== odpB.dataSourceAdditionalComments
  if (diffAdditionalComments) {
    return {
      diff: {
        field: 'dataSourceAdditionalComments',
        before: odpA.dataSourceAdditionalComments,
        after: odpB.dataSourceAdditionalComments,
      },
      newMessage: ActivityLogMessage.originalDataPointUpdateDataSources,
    }
  }

  const diffMethods = JSON.stringify(odpA.dataSourceMethods) !== JSON.stringify(odpB.dataSourceMethods)
  if (diffMethods) {
    return {
      diff: {
        field: 'dataSourceMethods',
        before: JSON.stringify(odpA.dataSourceMethods),
        after: JSON.stringify(odpB.dataSourceMethods),
      },
      newMessage: ActivityLogMessage.originalDataPointUpdateDataSources,
    }
  }

  const diffReferences = odpA.dataSourceReferences !== odpB.dataSourceReferences
  if (diffReferences) {
    return {
      diff: {
        field: 'dataSourceReferences',
        before: JSON.stringify(odpA.dataSourceReferences),
        after: JSON.stringify(odpB.dataSourceReferences),
      },
      newMessage: ActivityLogMessage.originalDataPointUpdateDataSources,
    }
  }

  return undefined
}
