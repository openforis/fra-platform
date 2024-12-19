import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { RoleName, User, UserInvitation, UserRole } from 'meta/user'
import { CollaboratorPermissions, UserRoleBaseProps, UserRoleExtendedProps } from 'meta/user/userRole'

import { BaseProtocol, DB } from 'server/db'

type Props = {
  assessmentUuid: Assessment['uuid']
  cycleUuid: Cycle['uuid']
  countryIso: CountryIso
  userUuid: User['uuid']
  role: UserInvitation['role']
  props?: UserRoleBaseProps | UserRoleExtendedProps
  permissions?: CollaboratorPermissions
  invitationUuid?: UserInvitation['uuid']
}

export const create = async (props: Props, client: BaseProtocol = DB): Promise<UserRole<RoleName>> => {
  const {
    assessmentUuid,
    cycleUuid,
    countryIso,
    userUuid,
    role,
    props: roleProps = {},
    permissions = {},
    invitationUuid,
  } = props

  return client.one<UserRole<RoleName>>(
    `
        insert into public.users_role (
            assessment_uuid, cycle_uuid, country_iso, user_uuid, role, props, permissions, invitation_uuid)
            values ($1, $2, $3, $4, $5, $6, $7, $8)
            returning *;
    `,
    [assessmentUuid, cycleUuid, countryIso, userUuid, role, roleProps, permissions, invitationUuid],
    Objects.camelize
  )
}
