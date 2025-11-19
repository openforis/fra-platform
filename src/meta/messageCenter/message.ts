import { User } from 'meta/user/user'

export interface Message {
  createdTime: string
  deleted: boolean
  id: number
  message: string
  topicId: number
  user?: User
  userId: number
}
