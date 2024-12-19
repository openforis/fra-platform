import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { TablePaginatedOrderByDirection } from 'meta/tablePaginated'
import { UserInvitationSummary } from 'meta/user/userInvitationSummary'

import { BaseProtocol, DB } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso?: CountryIso
  limit?: string
  offset?: string
  orderBy?: string
  orderByDirection?: TablePaginatedOrderByDirection
}

export const getMany = async (props: Props, client: BaseProtocol = DB): Promise<Array<UserInvitationSummary>> => {
  const { assessment, cycle, countryIso, limit, offset, orderBy, orderByDirection } = props

  const params: Record<string, string | number | boolean> = {
    assessmentId: assessment.id,
    cycleId: cycle.id,
  }

  if (countryIso) params.countryIso = countryIso
  if (limit) params.limit = limit
  if (offset) params.offset = offset

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
        where a.id = $(assessmentId)
          and ac.id = $(cycleId)
          ${countryIso ? 'and ui.country_iso = $(countryIso)' : ''}
        order by ${orderBy ?? 'country_iso'} ${orderByDirection ?? TablePaginatedOrderByDirection.asc} nulls last
        ${limit ? 'limit $(limit)' : ''}
        ${offset ? 'offset $(offset)' : ''}
    `,
    params,
    (row) => Objects.camelize(row)
  )
}
