import { Objects } from 'utils/objects'

import { Assessment, Cycle } from 'meta/assessment'
import { TablePaginatedOrderByDirection } from 'meta/tablePaginated'
import { UserInvitationSummary } from 'meta/user/userInvitationSummary'

import { BaseProtocol, DB } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
  limit: string
  offset: string
  orderBy?: string
  orderByDirection?: TablePaginatedOrderByDirection
}

export const getMany = async (props: Props, client: BaseProtocol = DB): Promise<Array<UserInvitationSummary>> => {
  const { assessment, cycle, limit, offset, orderBy, orderByDirection } = props

  return client.map<UserInvitationSummary>(
    `
        select ur.*,
               u.email
        from users_role ur
                 left join public.users u on ur.user_id = u.id
                 left join public.assessment a on ur.assessment_id = a.id
                 left join public.assessment_cycle ac on ur.cycle_uuid = ac.uuid and a.id = ac.assessment_id
        where a.id = $1
          and ac.id = $2
          and ur.invitation_uuid is not null
        order by ${orderBy ?? 'country_iso'} ${orderByDirection ?? TablePaginatedOrderByDirection.asc} nulls last
        limit $3 offset $4
    `,
    [assessment.id, cycle.id, limit, offset],
    (row) => Objects.camelize(row)
  )
}
