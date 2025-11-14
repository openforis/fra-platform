import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { SystemOfMeasurement } from 'meta/measurement/systemOfMeasurement'
import { UnitName } from 'meta/measurement/unitName'

export const convertValue = (value: string, unitName: UnitName, systemOfMeasurement: SystemOfMeasurement): string => {
  if (Objects.isNil(value)) return value

  const conversionFactor = systemOfMeasurement?.units?.[unitName]?.conversionFactor
  if (Objects.isNil(conversionFactor)) return value

  return Numbers.mul(value, conversionFactor).toString()
}
