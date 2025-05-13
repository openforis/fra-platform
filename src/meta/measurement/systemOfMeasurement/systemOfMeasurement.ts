import { UUID } from 'meta/uuid'

export type SystemOfMeasurement = {
  baseUnitUUID: UUID
  conversionFactors: Record<UUID, number> // conversion factor of each unit in relation to base unit
  name: string
  uuid: UUID
}
