import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { RoleName, User, UserInvitation } from 'meta/user'

import { BaseProtocol } from 'server/db'
import { DB } from 'server/db/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  invitedBy: User
  //   props: never
  role: RoleName
  user: User
}

export const create = async (props: Props, client: BaseProtocol = DB) => {
  const { assessment, cycle, countryIso, invitedBy, role, user } = props

  return client.one<UserInvitation>(
    `
    insert into users_invitation (assessment_uuid, cycle_uuid, country_iso, invited_by_user_uuid, user_uuid, role) values ($1, $2, $3, $4, $5, $6) returning *;
    `,
    [assessment.uuid, cycle.uuid, countryIso, invitedBy.uuid, user.uuid, role],
    (row) => Objects.camelize(row)
  )
}
