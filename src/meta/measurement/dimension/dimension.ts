import { UUID } from 'meta/uuid'

export type DimensionName = string

export type Dimension = {
  name: DimensionName
  uuid: UUID
  // value: string TODO: think if we need it later on
}
