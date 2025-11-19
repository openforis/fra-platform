import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { UserInvitation } from 'meta/user/invitation'
import { CollaboratorPermissions } from 'meta/user/role/collaborator'
import { RoleName } from 'meta/user/role/name'
import { User } from 'meta/user/user'

import { BaseProtocol, DB } from 'server/db/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  invitedBy: User
  role: RoleName
  user: User
  permissions?: CollaboratorPermissions
}

export const create = async (props: Props, client: BaseProtocol = DB): Promise<UserInvitation> => {
  const { assessment, countryIso, cycle, invitedBy, permissions, role, user } = props

  return client.one<UserInvitation>(
    `
    insert into users_invitation (assessment_uuid, cycle_uuid, country_iso, invited_by_user_uuid, user_uuid, role, permissions) values ($1, $2, $3, $4, $5, $6, $7) returning *;
    `,
    [assessment.uuid, cycle.uuid, countryIso, invitedBy.uuid, user.uuid, role, permissions],
    (row) => Objects.camelize(row)
  )
}
