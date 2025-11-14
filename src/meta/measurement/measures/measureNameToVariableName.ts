import { VariableName } from 'meta/assessment/variable'
import { MeasureName } from 'meta/measurement/measure'
import { measureToVariables } from 'meta/measurement/measures/variablesToMeasures'

export const measureNameToVariableName = (measureName: MeasureName): VariableName => {
  return measureToVariables[measureName] ?? measureName
}
