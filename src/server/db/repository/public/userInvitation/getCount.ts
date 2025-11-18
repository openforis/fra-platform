import { Objects } from 'utils/objects'

import { TablePaginatedCount } from 'meta/tablePaginated/count'

import { BaseProtocol, DB } from 'server/db/db'
import { InvitationsGetManyProps } from 'server/db/repository/public/userInvitation/invitationsGetManyProps'
import { getPropsToQueryParams } from 'server/db/repository/public/userInvitation/utils/getPropsToQueryParams'

export const getCount = async (
  props: InvitationsGetManyProps,
  client: BaseProtocol = DB
): Promise<TablePaginatedCount> => {
  const { queryParams, whereConditions } = getPropsToQueryParams(props)

  return client.one<TablePaginatedCount>(
    `
        select count(ui.uuid) as total
        from users_invitation ui
                 left join public.assessment a on ui.assessment_uuid = a.uuid
                 left join public.assessment_cycle ac on ui.cycle_uuid = ac.uuid and a.id = ac.assessment_id
        where ${whereConditions.join(' and ')}
    `,
    queryParams,
    (res) => Objects.camelize(res)
  )
}
