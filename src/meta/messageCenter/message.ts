import { User } from 'meta/user'

export interface Message {
  id: number
  topicId: number
  userId: number
  message: string
  deleted: boolean
  createdTime: string
  user?: User
}
