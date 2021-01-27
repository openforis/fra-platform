// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as FRA from '@common/assessment/fra'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as NumberUtils from '@common/bignumberUtils'

import * as AssessmentState from '@webapp/app/assessment/assessmentState'
import * as ForestCharacteristicsState from '@webapp/app/assessment/fra/sections/forestCharacteristics/forestCharacteristicsState'
import * as ExtentOfForestValidatorState from '@webapp/app/assessment/fra/sections/extentOfForest/extentOfForestValidatorState'

const section = FRA.sections['1'].children.e

const getTableDataCell = (colIdx: any, rowIdx: any) =>
  AssessmentState.getTableDataCell({
    assessmentType: FRA.type,
    sectionName: section.name,
    tableName: section.tables.specificForestCategories,
    rowIdx,
    colIdx,
  })

export const forestAreaValidator = (colIdx: any, rowIdx: any) => (state: any) =>
  ExtentOfForestValidatorState.lessThanOrEqualToForestValidator(
    FRA.yearsTable[colIdx],
    getTableDataCell(colIdx, rowIdx)(state)
  )(state)

export const primaryForestValidator = (colIdx: any) => (state: any) => {
  const primaryForest = getTableDataCell(colIdx, 3)(state)
  const naturalForest = ForestCharacteristicsState.getNaturalForestByYear(FRA.yearsTable[colIdx])(state)

  if (!primaryForest || !naturalForest) {
    return true
  }

  return NumberUtils.greaterThanWithTolerance(naturalForest, primaryForest)
}

export const getValidationMessages = (data: any) => (state: any) => {
  const colNo = data[0].length
  const messages = []

  for (let colIdx = 0; colIdx < colNo; colIdx += 1) {
    const colMessages: any = []
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
