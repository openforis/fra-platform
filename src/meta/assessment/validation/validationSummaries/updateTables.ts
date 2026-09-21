import { ValidationSummary } from 'meta/assessment/validation/summary'
import { RecordTableValidationsState } from 'meta/assessment/validation/table'
import { Objects } from 'utils/objects'

type Props = {
  summary: ValidationSummary
  tableValidations: RecordTableValidationsState
}

export const updateTables = (props: Props): void => {
  const { summary, tableValidations } = props

  Object.keys(tableValidations).forEach((tableName) => {
    summary.tables[tableName] = { valid: Objects.isEmpty(tableValidations[tableName]) }
  })
}
