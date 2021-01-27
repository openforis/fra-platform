import FRA from '@common/assessment/fra'

import * as AssessmentState from '@webapp/app/assessment/assessmentState'
import * as AssessmentStateValidator from '@webapp/app/assessment/assessmentStateValidator'
import * as ExtentOfForestValidatorState from '@webapp/app/assessment/fra/sections/extentOfForest/extentOfForestValidatorState'

const section = FRA.sections['3'].children.b

export const protectedAreaValidator = AssessmentStateValidator.subCategoryValidator(
  FRA.type,
  section.name,
  section.tables.forestAreaWithinProtectedAreas,
  1,
  [2]
)

export const forestAreaValidator = (colIdx: any, rowIdx: any) => (state: any) =>
  ExtentOfForestValidatorState.lessThanOrEqualToForestValidator(
    FRA.years[colIdx],
    AssessmentState.getTableDataCell({
      assessmentType: FRA.type,
      sectionName: section.name,
      tableName: section.tables.forestAreaWithinProtectedAreas,
      rowIdx,
      colIdx,
    })(state)
  )(state)

export const getValidationMessages = (data: any) => (state: any) => {
  const colNo = data[0].length
  const messages = []

  for (let colIdx = 0; colIdx < colNo; colIdx += 1) {
    const colMessages: any = []
    messages.push(colMessages)

    if (!protectedAreaValidator(colIdx, 2)(state)) {
      colMessages.push({ key: 'generalValidation.subCategoryExceedsParent' })
    }

    if (!forestAreaValidator(colIdx, 0)(state) || !forestAreaValidator(colIdx, 1)(state)) {
      colMessages.push({ key: 'generalValidation.forestAreaExceedsExtentOfForest' })
    }
  }

  return messages
}
