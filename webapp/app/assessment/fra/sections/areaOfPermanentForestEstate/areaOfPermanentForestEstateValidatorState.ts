import * as FRA from '@common/assessment/fra'

import * as AssessmentState from '@webapp/app/assessment/assessmentState'
import * as ExtentOfForestValidatorState from '@webapp/app/assessment/fra/sections/extentOfForest/extentOfForestValidatorState'

const section = FRA.sections['6'].children.b

export const areaOfPermanentEstateValidator = (colIdx) => (state) =>
  ExtentOfForestValidatorState.lessThanOrEqualToForestValidator(
    FRA.yearsTable[colIdx - 1],
    AssessmentState.getTableDataCell({
      assessmentType: FRA.type,
      sectionName: section.name,
      tableName: section.tables.areaOfPermanentForestEstate,
      rowIdx: 0,
      colIdx,
    })(state)
  )(state)

export const getValidationMessages = (data) => (state) => {
  const colNo = data[0].length
  const messages = [[]]

  for (let colIdx = 1; colIdx < colNo; colIdx += 1) {
    const colMessages = []
    messages.push(colMessages)

    if (!areaOfPermanentEstateValidator(colIdx)(state)) {
      colMessages.push({ key: 'generalValidation.forestAreaExceedsExtentOfForest' })
    }
  }

  return messages
}
