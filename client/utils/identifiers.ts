import { v4 as uuidv4 } from 'uuid'

const generateUuid = (): string => uuidv4()

export const Identifiers = {
  generateUuid,
}
