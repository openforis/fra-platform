import { ColName } from 'meta/assessment/col'
import { TableName } from 'meta/assessment/table'
import { RecordTableValidationsState } from 'meta/assessment/validation/table'
import { VariableName } from 'meta/assessment/variable'
import { Objects } from 'utils/objects'

type Props = {
  colName: ColName
  tableName: TableName
  tableValidations: RecordTableValidationsState
  variableName: VariableName
}

export const remove = (props: Props): void => {
  const { colName, tableName, tableValidations, variableName } = props

  Objects.unset(tableValidations, [tableName, colName, variableName])

  // Remove the column after deleting its last invalid node.
  if (Objects.isEmpty(tableValidations[tableName]?.[colName])) {
    Objects.unset(tableValidations, [tableName, colName])
  }
}
