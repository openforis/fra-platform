import { SystemOfMeasurementName } from 'meta/measurement/systemOfMeasurement'
import { UUID } from 'meta/uuid/uuid'

export type MeasureName = string

export type MeasureDB = {
  name: MeasureName
  systemUUID?: UUID // system of measurement uuid
  uuid: UUID
}

export type Measure = Omit<MeasureDB, 'systemUUID' | 'uuid'> & {
  systemName: SystemOfMeasurementName
}
