import { Lang } from 'meta/lang'
import { RoleName } from 'meta/user'
import { CollaboratorPermissionsNEW } from 'meta/user/userRole'

export type UserInvitationForm = {
  email: string
  language: Lang
  name: string
  permissions?: CollaboratorPermissionsNEW
  role: RoleName
  surname: string
}
