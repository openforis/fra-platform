import { v4, validate } from 'uuid'

export const UUIDs = {
  getUuid: v4,
  isUuid: validate,
}
