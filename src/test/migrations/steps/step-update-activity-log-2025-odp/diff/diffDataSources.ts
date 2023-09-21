import { ActivityLogMessage, OriginalDataPoint } from 'meta/assessment'

export const diffDataSources = (odpA: OriginalDataPoint, odpB: OriginalDataPoint) => {
  const diffAdditionalComments = odpA.dataSourceAdditionalComments !== odpB.dataSourceAdditionalComments
  if (diffAdditionalComments) {
    return {
      diff: {
        field: 'dataSourceAdditionalComments',
        before: odpB.dataSourceAdditionalComments,
        after: odpA.dataSourceAdditionalComments,
      },
      newMessage: ActivityLogMessage.originalDataPointUpdateDataSources,
    }
  }

  // Methods differ if ...
  const diffMethods =
    // ... the length is different
    odpA.dataSourceMethods.length !== odpB.dataSourceMethods.length ||
    // ... or if any method is in one array but not the other
    odpA.dataSourceMethods.some((method) => !odpB.dataSourceMethods.includes(method)) ||
    odpB.dataSourceMethods.some((method) => !odpA.dataSourceMethods.includes(method)) ||
    // or they are in different order
    odpA.dataSourceMethods.some((method, index) => method !== odpB.dataSourceMethods[index])

  if (diffMethods) {
    return {
      diff: {
        field: 'dataSourceMethods',
        before: JSON.stringify(odpB.dataSourceMethods),
        after: JSON.stringify(odpA.dataSourceMethods),
      },
      newMessage: ActivityLogMessage.originalDataPointUpdateDataSources,
    }
  }

  const diffReferences = odpA.dataSourceReferences !== odpB.dataSourceReferences
  if (diffReferences) {
    return {
      diff: {
        field: 'dataSourceReferences',
        before: JSON.stringify(odpB.dataSourceReferences),
        after: JSON.stringify(odpA.dataSourceReferences),
      },
      newMessage: ActivityLogMessage.originalDataPointUpdateDataSources,
    }
  }

  return undefined
}
