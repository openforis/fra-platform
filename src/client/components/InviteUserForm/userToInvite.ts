import { Lang } from 'meta/lang'
import { CollaboratorPermissions, RoleName } from 'meta/user'

export interface UserToInvite {
  email: string
  lang: Lang
  name: string
  permissions?: CollaboratorPermissions
  role?: RoleName | ''
  surname: string
}
