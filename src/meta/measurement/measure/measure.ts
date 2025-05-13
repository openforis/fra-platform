import { UUID } from 'meta/uuid'

export type Measure = {
  name: string
  systemUUID?: UUID // system of measurement uuid
  uuid: UUID
}
