import { User } from 'meta/user/user'
import { UUID } from 'meta/uuid/uuid'

export interface Message {
  createdTime: string
  deleted: boolean
  id: number
  message: string
  topicUuid: UUID
  user?: User
  userId: number
}
