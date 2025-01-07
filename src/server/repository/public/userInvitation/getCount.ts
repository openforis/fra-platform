import { Objects } from 'utils/objects'

import { Assessment, Cycle } from 'meta/assessment'
import { TablePaginatedCount } from 'meta/tablePaginated'

import { BaseProtocol, DB } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
}

export const getCount = async (props: Props, client: BaseProtocol = DB): Promise<TablePaginatedCount> => {
  const { assessment, cycle } = props

  return client.one<TablePaginatedCount>(
    `
        select count(ui.uuid) as total
        from users_invitation ui
                 left join public.assessment a on ui.assessment_uuid = a.uuid
                 left join public.assessment_cycle ac on ui.cycle_uuid = ac.uuid and a.id = ac.assessment_id
        where a.id = $1
          and ac.id = $2
    `,
    [assessment.id, cycle.id],
    (res) => Objects.camelize(res)
  )
}
