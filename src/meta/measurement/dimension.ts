import { UUID } from 'meta/uuid/uuid'

export type DimensionName = string
export type DimensionDB = {
  name: DimensionName
  uuid: UUID
  // value: string TODO: think if we need it later on
}
export type Dimension = Omit<DimensionDB, 'uuid'>
