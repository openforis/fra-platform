import { Lang } from 'meta/lang'
import { RoleName } from 'meta/user'

export interface UserToInvite {
  name: string
  surname: string
  role?: RoleName | ''
  email: string
  lang: Lang
}
