import { Unit } from 'meta/measurement/unit'
import { UUID } from 'meta/uuid'

import { SystemOfMeasurementName } from './systemOfMeasurementName'

export type SystemOfMeasurement = {
  baseUnitUUID: UUID
  conversionFactors: Record<UUID, number> // conversion factor of each unit in relation to base unit
  name: SystemOfMeasurementName
  uuid: UUID
}

export type SystemOfMeasurementWithUnits = SystemOfMeasurement & {
  units: Record<UUID, Pick<Unit, 'name' | 'symbol'>>
}
