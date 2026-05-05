import { User } from 'meta/user/user'

export type LoginLocalInfoResponse = {
  invitationUuid?: string
  message?: string
}

export type LoginLocalResponse = {
  user: User
  info?: LoginLocalInfoResponse
}
