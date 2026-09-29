import { AnalyticsElementSummary } from 'meta/analytics/analyticsEvent'
import { TablePaginatedOrderByDirection } from 'meta/tablePaginated/orderBy'

import { BaseProtocol, DB } from 'server/db/db'

type Props = {
  limit?: number
  offset?: number
  orderBy?: string
  orderByDirection?: TablePaginatedOrderByDirection
}

const orderByColumns: Record<string, string> = {
  avgDurationMs: '"avgDurationMs"',
  clickCount: '"clickCount"',
  elementId: '"elementId"',
}

export const findAll = async (props: Props, client: BaseProtocol = DB): Promise<Array<AnalyticsElementSummary>> => {
  const { limit = 20, offset = 0, orderBy, orderByDirection } = props

  const orderByColumn = orderByColumns[orderBy] ?? '"clickCount"'
  const direction = orderByDirection === TablePaginatedOrderByDirection.asc ? 'asc' : 'desc'

  return client.any<AnalyticsElementSummary>(
    `
        select
            payload ->> 'element_id' as "elementId",
            count(*) as "clickCount",
            round(avg((payload ->> 'duration_ms')::numeric)) as "avgDurationMs"
        from public.analytics_event
        where event_type = 'click'
        group by payload ->> 'element_id'
        order by ${orderByColumn} ${direction}
        limit $(limit)
        offset $(offset)`,
    { limit, offset }
  )
}
