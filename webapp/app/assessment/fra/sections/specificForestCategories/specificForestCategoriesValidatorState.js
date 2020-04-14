import * as FRA from '@common/assessment/fra'
import * as NumberUtils from '@common/bignumberUtils'

import * as AssessmentState from '@webapp/app/assessment/assessmentState'
import * as ForestCharacteristicsState from '@webapp/app/assessment/fra/sections/forestCharacteristics/forestCharacteristicsState'
import * as ExtentOfForestValidatorState from '@webapp/app/assessment/fra/sections/extentOfForest/extentOfForestValidatorState'

const section = FRA.sections['1'].children.e

const getTableDataCell = (colIdx, rowIdx) =>
  AssessmentState.getTableDataCell({
    assessmentType: FRA.type,
    sectionName: section.name,
    tableName: section.tables.specificForestCategories,
    rowIdx,
    colIdx,
  })

export const forestAreaValidator = (colIdx, rowIdx) => (state) =>
  ExtentOfForestValidatorState.lessThanOrEqualToForestValidator(
    FRA.yearsTable[colIdx],
    getTableDataCell(colIdx, rowIdx)(state)
  )(state)

export const primaryForestValidator = (colIdx) => (state) => {
  const primaryForest = getTableDataCell(colIdx, 3)(state)
  const naturalForest = ForestCharacteristicsState.getNaturalForestByYear(FRA.yearsTable[colIdx])(state)

  if (!primaryForest || !naturalForest) {
    return true
  }

  const tolerance = -1
  const difference = NumberUtils.sub(naturalForest, primaryForest)
  return NumberUtils.greaterThan(difference, tolerance)
}

export const getValidationMessages = (data) => (state) => {
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

    if (!primaryForestValidator(colIdx)(state)) {
      colMessages.push({ key: 'specificForestCategories.exceedsNaturallyRegeneratingForest' })
    }
  }

  return messages
}
