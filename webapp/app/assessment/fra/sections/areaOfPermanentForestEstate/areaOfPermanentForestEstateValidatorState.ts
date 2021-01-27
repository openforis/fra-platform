// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as FRA from '@common/assessment/fra'

import * as AssessmentState from '@webapp/app/assessment/assessmentState'
import * as ExtentOfForestValidatorState from '@webapp/app/assessment/fra/sections/extentOfForest/extentOfForestValidatorState'

const section = FRA.sections['6'].children.b

export const areaOfPermanentEstateValidator = (colIdx: any) => (state: any) =>
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

export const getValidationMessages = (data: any) => (state: any) => {
  const colNo = data[0].length
  // @ts-expect-error ts-migrate(7005) FIXME: Variable 'messages' implicitly has an 'any[][]' ty... Remove this comment to see the full error message
  const messages = [[]]

  for (let colIdx = 1; colIdx < colNo; colIdx += 1) {
    const colMessages: any = []
    messages.push(colMessages)

    if (!areaOfPermanentEstateValidator(colIdx)(state)) {
      colMessages.push({ key: 'generalValidation.forestAreaExceedsExtentOfForest' })
    }
  }

  return messages
}
