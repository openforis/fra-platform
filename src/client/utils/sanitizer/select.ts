import { ColSelectOption } from 'meta/assessment'

import { optionNotSelected } from 'client/pages/AssessmentSection/DataTable/Table/Row/RowData/Cell/Select/OptionNotSelected'

export const acceptNextSelectOption = (newValue: string, currentValue: string, options?: Array<ColSelectOption>) => {
  const valid = Boolean([optionNotSelected, ...options].find((option) => option.name === newValue))
  if (valid) {
    return newValue
  }
  return currentValue
}
