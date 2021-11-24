import { FRA } from '@core/assessment'

import * as AssessmentState from '../../../app/assessment/assessmentState'
import * as ExtentOfForestValidatorState from '../../../sectionSpec/fra/extentOfForest/extentOfForestValidatorState'

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
  const messages: any[] = [[]]

  for (let colIdx = 1; colIdx < colNo; colIdx += 1) {
    const colMessages: any = []
    messages.push(colMessages)

    if (!areaOfPermanentEstateValidator(colIdx)(state)) {
      colMessages.push({ key: 'generalValidation.forestAreaExceedsExtentOfForest' })
    }
  }

  return messages
}
