import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { RoleName, User, UserRole } from 'meta/user'
import { CollaboratorPermissions, UserRoleBaseProps, UserRoleExtendedProps } from 'meta/user/userRole'

import { BaseProtocol, DB } from 'server/db'

export const create = async (
  props: {
    assessment: Pick<Assessment, 'id'>
    country: CountryIso
    cycle: Cycle
    invitedByUserUuid: string
    permissions?: CollaboratorPermissions
    props?: UserRoleBaseProps | UserRoleExtendedProps
    role: RoleName
    user: Pick<User, 'id'>
  },
  client: BaseProtocol = DB
): Promise<UserRole<RoleName>> => {
  const {
    assessment: { id: assessmentId },
    country,
    cycle,
    invitedByUserUuid,
    permissions,
    props: properties,
    role,
    user: { id: userId },
  } = props

  return client.one<UserRole<RoleName>>(
    `
        insert into public.users_role (
            user_id, assessment_id, country_iso, role, props, cycle_uuid, permissions, invited_by_user_uuid)
            values ($1, $2, $3, $4, $5, $6, $7, $8)
            returning *;
    `,
    [userId, assessmentId, country, role, properties ?? {}, cycle.uuid, permissions ?? {}, invitedByUserUuid],
    Objects.camelize
  )
}
