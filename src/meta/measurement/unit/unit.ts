import { UUID } from 'meta/uuid'

import { UnitName } from './unitName'

export type Unit = {
  name: UnitName
  symbol: string
  uuid: UUID
}
