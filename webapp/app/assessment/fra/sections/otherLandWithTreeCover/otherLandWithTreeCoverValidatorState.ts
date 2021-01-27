import * as R from 'ramda'

import * as NumberUtils from '@common/bignumberUtils'

import * as OtherLandWithTreeCoverState from '@webapp/app/assessment/fra/sections/otherLandWithTreeCover/otherLandWithTreeCoverState'

export const otherLandWithTreeCoverTotalValidator = (colIdx) => (state) => {
  const otherLand = OtherLandWithTreeCoverState.getOtherLand(colIdx)(state)
  const otherLandWithTreeCoverTotal = OtherLandWithTreeCoverState.getOtherLandWithTreeCoverTotal(colIdx)(state)

  if (R.isNil(otherLand) || R.isNil(otherLandWithTreeCoverTotal)) {
    return true
  }

  return NumberUtils.greaterThanWithTolerance(otherLand, otherLandWithTreeCoverTotal)
}

export const getValidationMessages = (data) => (state) => {
  const colNo = data[0].length
  const messages = []

  for (let colIdx = 0; colIdx < colNo; colIdx += 1) {
    const colMessages = []
    messages.push(colMessages)

    if (!otherLandWithTreeCoverTotalValidator(colIdx)(state)) {
      colMessages.push({ key: 'generalValidation.otherLandExceedsExtentOfForest' })
    }
  }

  return messages
}
