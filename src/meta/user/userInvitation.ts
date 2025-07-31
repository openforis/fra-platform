import { CountryIso } from 'meta/area'
import { CollaboratorPermissionsNEW, RoleName } from 'meta/user/userRole'

export interface UserInvitation {
  acceptedAt?: string
  assessmentUuid: string
  countryIso: CountryIso
  cycleUuid: string
  id: number
  invitedAt: string
  invitedByUserUuid: string
  permissions?: CollaboratorPermissionsNEW
  role: RoleName
  userUuid: string
  uuid: string
}
