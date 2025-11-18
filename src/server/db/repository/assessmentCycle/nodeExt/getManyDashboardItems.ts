import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { DashboardItem, DashboardItemType } from 'meta/dashboard/item'
import { NodeExtType } from 'meta/nodeExt/nodeExt'

import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

type Props = { assessment: Assessment; cycle: Cycle; region?: boolean }

export const getManyDashboardItems = async (
  props: Props,
  client: BaseProtocol = DB
): Promise<Array<DashboardItem<DashboardItemType>>> => {
  const { assessment, cycle, region } = props
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)
  return client.one<Array<DashboardItem<DashboardItemType>>>(
    `
    select value 
    from ${schemaCycle}.node_ext 
    where type = $1 
    ${
      region
        ? `and (props->>'region')::boolean = true`
        : `and (props->>'region' is null or (props->>'region')::boolean = false)`
    }
    `,
    [NodeExtType.dashboard],
    (result) => result.value
  )
}
