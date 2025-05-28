import { TableName } from 'meta/assessment/table'
import { VariableName } from 'meta/assessment/variable'
import { MeasureName } from 'meta/measurement/measure/measure'
import { measureToVariables, variableToMeasures } from 'meta/measurement/measure/variablesToMeasures'

const measureNameToVariableName = (measureName: MeasureName): VariableName => {
  return measureToVariables[measureName] ?? measureName
}

const variableNameToMeasureName = (tableName: TableName, variableName: VariableName): MeasureName | VariableName => {
  return variableToMeasures[tableName]?.[variableName] ?? variableName
}
export const Measures = {
  measureNameToVariableName,
  variableNameToMeasureName,
}
