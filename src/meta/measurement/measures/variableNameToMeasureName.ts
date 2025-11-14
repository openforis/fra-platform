import { TableName } from 'meta/assessment/table'
import { VariableName } from 'meta/assessment/variable'
import { MeasureName } from 'meta/measurement/measure'
import { variableToMeasures } from 'meta/measurement/measures/variablesToMeasures'

export const variableNameToMeasureName = (
  tableName: TableName,
  variableName: VariableName
): MeasureName | VariableName => {
  return variableToMeasures[tableName]?.[variableName] ?? variableName
}
