import { Objects } from 'utils/objects'

import { TablePaginatedOrderByDirection } from 'meta/tablePaginated'
import { UserInvitationSummary } from 'meta/user/userInvitationSummary'

import { BaseProtocol, DB } from 'server/db/db'
import { InvitationsGetManyProps } from 'server/db/repository/public/userInvitation/invitationsGetManyProps'
import { getPropsToQueryParams } from 'server/db/repository/public/userInvitation/utils/getPropsToQueryParams'

const _getOrderClause = (
  orderBy: string | undefined = 'country_iso',
  orderByDirection: TablePaginatedOrderByDirection = TablePaginatedOrderByDirection.asc
): string => {
  return `order by
    ${orderBy} ${orderByDirection} nulls last`
}

export const getMany = async (
  props: InvitationsGetManyProps,
  client: BaseProtocol = DB
): Promise<Array<UserInvitationSummary>> => {
  const { orderBy, orderByDirection } = props

  const order = _getOrderClause(orderBy, orderByDirection)

  const { queryParams, whereConditions } = getPropsToQueryParams(props)

  return client.map<UserInvitationSummary>(
    `
        select ui.*,
               u.email,
               concat(u.props ->> 'name', ' ', u.props ->> 'surname') as name,
               coalesce(u.props ->> 'lang', 'en') as lang
        from users_invitation ui
                 left join public.users u on ui.user_uuid = u.uuid
                 left join public.assessment a on ui.assessment_uuid = a.uuid
                 left join public.assessment_cycle ac on ui.cycle_uuid = ac.uuid and a.id = ac.assessment_id
        where ${whereConditions.join(' and ')}
        ${order}
        ${queryParams.limit ? `limit $(limit)` : ''}
        ${queryParams.offset ? `offset $(offset)` : ''}
    `,
    queryParams,
    (row) => Objects.camelize(row)
  )
}
