import { UUID } from 'meta/uuid'

export type MeasureName = string

export type Measure = {
  name: MeasureName
  systemUUID?: UUID // system of measurement uuid
  uuid: UUID
}
