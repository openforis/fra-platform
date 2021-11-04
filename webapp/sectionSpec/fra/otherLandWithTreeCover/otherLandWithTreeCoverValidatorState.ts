import * as R from 'ramda'

import { Numbers } from '@core/utils/numbers'
import * as OtherLandWithTreeCoverState from '@webapp/sectionSpec/fra/otherLandWithTreeCover/otherLandWithTreeCoverState'

export const otherLandWithTreeCoverTotalValidator = (colIdx: any) => (state: any) => {
  const otherLand = OtherLandWithTreeCoverState.getOtherLand(colIdx)(state)
  const otherLandWithTreeCoverTotal = OtherLandWithTreeCoverState.getOtherLandWithTreeCoverTotal(colIdx)(state)

  if (R.isNil(otherLand) || R.isNil(otherLandWithTreeCoverTotal)) {
    return true
  }

  return Numbers.greaterThanWithTolerance(otherLand, otherLandWithTreeCoverTotal)
}

export const getValidationMessages = (data: any) => (state: any) => {
  const colNo = data[0].length
  const messages = []

  for (let colIdx = 0; colIdx < colNo; colIdx += 1) {
    const colMessages: any = []
    messages.push(colMessages)

    if (!otherLandWithTreeCoverTotalValidator(colIdx)(state)) {
      colMessages.push({ key: 'generalValidation.otherLandExceedsExtentOfForest' })
    }
  }

  return messages
}
