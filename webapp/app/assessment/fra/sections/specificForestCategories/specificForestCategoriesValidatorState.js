import * as FRA from '@common/assessment/fra'

import * as AssessmentState from '@webapp/app/assessment/assessmentState'
import * as ExtentOfForestValidatorState from '@webapp/app/assessment/fra/sections/extentOfForest/extentOfForestValidatorState'

const section = FRA.sections['1'].children.e

export const forestAreaValidator = (colIdx, rowIdx) => state =>
  ExtentOfForestValidatorState.lessThanOrEqualToForestValidator(
    FRA.yearsTable[colIdx],
    AssessmentState.getTableDataCell({
      assessmentType: FRA.type,
      sectionName: section.name,
      tableName: section.tables.specificForestCategories,
      rowIdx,
      colIdx,
    })(state)
  )(state)

export const getValidationMessages = data => state => {
  const colNo = data[0].length
  const messages = []

  for (let colIdx = 0; colIdx < colNo; colIdx += 1) {
    const colMessages = []
    messages.push(colMessages)

    if (
      !forestAreaValidator(colIdx, 0)(state) ||
      !forestAreaValidator(colIdx, 1)(state) ||
      !forestAreaValidator(colIdx, 4)(state)
    ) {
      colMessages.push({ key: 'generalValidation.forestAreaExceedsExtentOfForest' })
    }
  }

  return messages
}
