import { CountryIso } from 'meta/area'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { TableName } from 'meta/assessment/table'
import { NodeUpdate } from 'meta/data'

import { updateNodes } from 'server/cache/repository/data/updateNodes'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
} & NodeUpdate

export const updateNode = (props: Props): Promise<void> => {
  const { assessment, colName, countryIso, cycle, tableName, value, variableName } = props

  const node: NodeUpdate = { tableName, variableName, colName, value }
  const nodes: Record<TableName, Array<NodeUpdate>> = { [tableName]: [node] }

  return updateNodes({ assessment, cycle, countryIso, nodes })
}
