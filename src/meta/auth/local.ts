import { User } from 'meta/user/user'

export type LoginLocalInfoResponse = {
  message: string
}

export type LoginLocalResponse = {
  user: User
  info?: LoginLocalInfoResponse
}
