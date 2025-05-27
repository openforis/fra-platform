import { variableToMeasures } from 'meta/measurement/measure/variablesToMeasures'

const variableNameToMeasureName = (tableName: string, variableName: string) => {
  const measureName = variableToMeasures[tableName]?.[variableName]
  if (!measureName) return variableName
  return measureName
}

export const Measures = {
  variableNameToMeasureName,
}
