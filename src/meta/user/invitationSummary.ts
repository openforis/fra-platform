import { UserInvitation } from 'meta/user/invitation'
import { User } from 'meta/user/user'

export type UserInvitationSummary = UserInvitation & {
  email: string
  name: User['props']['name']
  lang: User['props']['lang']
}
