import { CountryIso } from 'meta/area'
import { RoleName } from 'meta/user/userRole'

export interface UserInvitation {
  acceptedAt?: string
  assessmentUuid: string
  countryIso?: CountryIso
  cycleUuid: string
  id: number
  invitedAt: string
  invitedByUserUuid?: string
  props: never // default {}
  role: RoleName
  userUuid: string
  uuid: string
}
