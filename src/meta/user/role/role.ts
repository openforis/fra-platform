import { CountryIso } from 'meta/area/countryIso'
import { RoleName } from 'meta/user/role/name'
import { UserRoleBaseProps, UserRoleExtendedProps } from 'meta/user/role/props'

export interface UserRole<
  Name extends RoleName = RoleName,
  Props extends UserRoleBaseProps = undefined,
  Permissions = undefined
> {
  assessmentUuid?: string
  countryIso?: CountryIso
  createdAt: string
  cycleUuid?: string
  id: number
  invitationUuid?: string
  permissions: Permissions
  props: Props
  role: Name
  userUuid: string
  uuid: string
}

export type UserRoleExtended<Name extends RoleName> = UserRole<Name, UserRoleExtendedProps>
