import { FRA } from '@core/assessment'

import * as GrowingStockCompositionState from '@webapp/sectionSpec/fra/growingStockComposition/growingStockCompositionState'
import * as GrowingStockValidatorState from '@webapp/sectionSpec/fra/growingStock/growingStockValidatorState'

export const totalGrowingStockValidator = (colIdx: any) => (state: any) => {
  const totalGrowingStock = GrowingStockCompositionState.getTotalGrowingStock(colIdx)(state)
  const year = FRA.yearsTable[colIdx - 2]
  return GrowingStockValidatorState.equalToTotalGrowingStockValidator(year, totalGrowingStock)(state)
}

export const getValidationMessages = (data: any) => (state: any) => {
  const colNo = data[0].length
  const messages: any = [[], []]

  for (let colIdx = 2; colIdx < colNo; colIdx += 1) {
    const colMessages: any = []
    messages.push(colMessages)

    if (!totalGrowingStockValidator(colIdx)(state)) {
      colMessages.push({ key: 'generalValidation.mustBeEqualToTotalGrowingStock' })
    }
  }

  return messages
}
