import { v4 } from 'uuid'

export type { UUID } from './uuid'

export const UUIDs = {
  getUuid: v4,
}
