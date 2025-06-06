import { Objects } from 'utils/objects'

import { SystemOfMeasurementDB } from 'meta/measurement/systemOfMeasurement'

interface SystemOfMeasurementDBRaw {
  base_unit_uuid: string
  conversion_factors: SystemOfMeasurementDB['conversionFactors']
  id: number
  name: string
  uuid: string
}

export const SystemOfMeasurementAdapter = (systemOfMeasurement: SystemOfMeasurementDBRaw): SystemOfMeasurementDB => {
  return {
    ...Objects.camelize(systemOfMeasurement),
    baseUnitUUID: systemOfMeasurement.base_unit_uuid,
    conversionFactors: systemOfMeasurement.conversion_factors,
  }
}
