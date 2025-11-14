import { UnitName } from 'meta/measurement/unitName'
import { UUID } from 'meta/uuid'

export type Unit = {
  name: UnitName
  symbol: string
  uuid: UUID
}
