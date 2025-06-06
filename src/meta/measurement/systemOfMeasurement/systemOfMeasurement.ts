import { Unit, UnitName } from 'meta/measurement/unit'
import { UUID } from 'meta/uuid'

import { SystemOfMeasurementName } from './systemOfMeasurementName'

export type SystemOfMeasurementDB = {
  baseUnitUUID: UUID
  conversionFactors: Record<UUID, number> // conversion factor of each unit in relation to base unit
  name: SystemOfMeasurementName
  uuid: UUID
}

export type SystemOfMeasurement = {
  baseUnitName: UnitName
  name: SystemOfMeasurementName
  units: Partial<Record<UnitName, Omit<Unit, 'uuid'> & { conversionFactor: number }>>
}
