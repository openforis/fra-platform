import FRA from '@common/assessment/fra'

import * as DisturbancesState from '@webapp/app/assessment/fra/sections/disturbances/disturbancesState'
import * as ExtentOfForestValidatorState from '@webapp/app/assessment/fra/sections/extentOfForest/extentOfForestValidatorState'

export const disturbancesTotalValidator = (colIdx: any) => (state: any) =>
  ExtentOfForestValidatorState.lessThanOrEqualToForestValidator(
    FRA.yearsAnnual[colIdx],
    DisturbancesState.getDisturbancesTotal(colIdx)(state)
  )(state)

export const getValidationMessages = (data: any) => (state: any) => {
  const colNo = data[0].length
  const messages = []

  for (let colIdx = 0; colIdx < colNo; colIdx += 1) {
    const colMessages: any = []
    messages.push(colMessages)

    if (!disturbancesTotalValidator(colIdx)(state)) {
      colMessages.push({ key: 'generalValidation.forestAreaExceedsExtentOfForest' })
    }
  }

  return messages
}
