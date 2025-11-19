import { Lang } from 'meta/lang'
import { UserInvitation } from 'meta/user/invitation'
import { User } from 'meta/user/user'

export type UserCountrySummary = User & {
  readonly fullName: string
  readonly lang: Lang
  readonly invitations: Array<UserInvitation>
}
