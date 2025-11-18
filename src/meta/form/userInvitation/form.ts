import { Lang } from 'meta/lang'
import { CollaboratorPermissions } from 'meta/user/role/collaborator'
import { RoleName } from 'meta/user/role/name'

export type UserInvitationForm = {
  email: string
  language: Lang
  name: string
  permissions?: CollaboratorPermissions
  role: RoleName
  surname: string
}
