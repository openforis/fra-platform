// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as FRA from '@common/assessment/fra'

import * as GrowingStockCompositionState from '@webapp/app/assessment/fra/sections/growingStockComposition/growingStockCompositionState'
import * as GrowingStockValidatorState from '@webapp/app/assessment/fra/sections/growingStock/growingStockValidatorState'

export const totalGrowingStockValidator = (colIdx: any) => (state: any) => {
  const totalGrowingStock = GrowingStockCompositionState.getTotalGrowingStock(colIdx)(state)
  const year = FRA.yearsTable[colIdx - 2]
  return GrowingStockValidatorState.equalToTotalGrowingStockValidator(year, totalGrowingStock)(state)
}

export const getValidationMessages = (data: any) => (state: any) => {
  const colNo = data[0].length
  // @ts-expect-error ts-migrate(7005) FIXME: Variable 'messages' implicitly has an 'any[][]' ty... Remove this comment to see the full error message
  const messages = [[], []]

  for (let colIdx = 2; colIdx < colNo; colIdx += 1) {
    const colMessages: any = []
    messages.push(colMessages)

    if (!totalGrowingStockValidator(colIdx)(state)) {
      colMessages.push({ key: 'generalValidation.mustBeEqualToTotalGrowingStock' })
    }
  }

  return messages
}
