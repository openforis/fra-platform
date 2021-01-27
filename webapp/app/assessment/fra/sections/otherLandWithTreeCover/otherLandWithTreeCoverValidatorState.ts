// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'

// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as NumberUtils from '@common/bignumberUtils'

import * as OtherLandWithTreeCoverState from '@webapp/app/assessment/fra/sections/otherLandWithTreeCover/otherLandWithTreeCoverState'

export const otherLandWithTreeCoverTotalValidator = (colIdx: any) => (state: any) => {
  const otherLand = OtherLandWithTreeCoverState.getOtherLand(colIdx)(state)
  const otherLandWithTreeCoverTotal = OtherLandWithTreeCoverState.getOtherLandWithTreeCoverTotal(colIdx)(state)

  if (R.isNil(otherLand) || R.isNil(otherLandWithTreeCoverTotal)) {
    return true
  }

  return NumberUtils.greaterThanWithTolerance(otherLand, otherLandWithTreeCoverTotal)
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
