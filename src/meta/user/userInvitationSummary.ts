import { User } from 'meta/user/user'
import { UserInvitation } from 'meta/user/userInvitation'

export type UserInvitationSummary = UserInvitation & {
  email: string
  name: User['props']['name']
  lang: User['props']['lang']
}
