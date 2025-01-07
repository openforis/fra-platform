import { Assessment, Cycle } from 'meta/assessment'
import { DashboardItem, DashboardItemType } from 'meta/dashboard'
import { NodeExtType } from 'meta/nodeExt'

import { BaseProtocol, DB, Schemas } from 'server/db'

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
