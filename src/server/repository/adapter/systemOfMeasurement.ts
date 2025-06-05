import { Objects } from 'utils/objects'

import { SystemOfMeasurement } from 'meta/measurement/systemOfMeasurement'

interface SystemOfMeasurementDB {
  conversion_factors: SystemOfMeasurement['conversionFactors']
  id: number
  name: string
  uuid: string
}

export const SystemOfMeasurementAdapter = (systemOfMeasurement: SystemOfMeasurementDB): SystemOfMeasurement => {
  return { ...Objects.camelize(systemOfMeasurement), conversionFactors: systemOfMeasurement.conversion_factors }
}
