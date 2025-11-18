import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { UserInvitation } from 'meta/user/invitation'
import { CollaboratorPermissions } from 'meta/user/role/collaborator'
import { RoleName } from 'meta/user/role/name'
import { UserRoleBaseProps, UserRoleExtendedProps } from 'meta/user/role/props'
import { UserRole } from 'meta/user/role/role'
import { User } from 'meta/user/user'

import { BaseProtocol, DB } from 'server/db/db'

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
    countryIso,
    cycleUuid,
    invitationUuid,
    permissions,
    props: roleProps = {},
    role,
    userUuid,
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
