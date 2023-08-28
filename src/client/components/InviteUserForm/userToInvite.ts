import { Lang } from 'meta/lang'
import { RoleName } from 'meta/user'

export interface UserToInvite {
  name: string
  role?: RoleName | ''
  email: string
  lang: Lang
}
