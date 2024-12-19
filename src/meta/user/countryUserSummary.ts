import { Lang } from 'meta/lang'
import { User } from 'meta/user/user'
import { UserInvitation } from 'meta/user/userInvitation'

export type CountryUserSummary = User & {
  readonly fullName: string
  readonly lang: Lang
  readonly invitations: Array<UserInvitation>
}
