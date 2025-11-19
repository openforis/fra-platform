import { CountryIso } from 'meta/area/countryIso'
import { CollaboratorPermissions } from 'meta/user/role/collaborator'
import { RoleName } from 'meta/user/role/name'

export interface UserInvitation {
  acceptedAt?: string
  assessmentUuid: string
  countryIso: CountryIso
  cycleUuid: string
  id: number
  invitedAt: string
  invitedByUserUuid: string
  permissions?: CollaboratorPermissions
  role: RoleName
  userUuid: string
  uuid: string
}
