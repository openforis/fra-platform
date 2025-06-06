import { UUID } from 'meta/uuid'

export type SystemOfMeasurement = {
  baseUnitUUID: UUID
  conversionFactors: Record<UUID, number> // conversion factor of each unit in relation to base unit
  name: string
  uuid: UUID
}

// export type SystemOfMeasurementDB = {
//   baseUnitUUID: UUID
//   conversionFactors: Record<UUID, number> // conversion factor of each unit in relation to base unit
//   name: string
//   uuid: UUID
// }
//
// // FE:
// export type SystemOfMeasurement = {
//   baseUnitName: UnitName
//   name: string
//   units: Record<UnitName, Unit & { conversionFactor: number }>
//   // conversionFactors:Record<UUID, number>
// }
