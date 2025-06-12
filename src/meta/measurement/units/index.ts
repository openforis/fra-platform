import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { UnitName } from 'meta/measurement/unit/unitName'

import { SystemOfMeasurement } from '../systemOfMeasurement'

const convertValue = (value: string, unitName: UnitName, systemOfMeasurement: SystemOfMeasurement): string => {
  if (Objects.isNil(value)) return value
  const conversionFactor = systemOfMeasurement?.units?.[unitName]?.conversionFactor
  if (Objects.isNil(conversionFactor)) return value

  return Numbers.mul(value, conversionFactor).toString()
}

export const Units = {
  convertValue,
}
