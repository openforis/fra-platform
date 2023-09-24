import { CountryIso } from 'meta/area'
import { Assessment, Cycle, TableName } from 'meta/assessment'
import { NodeUpdate } from 'meta/data'

import { updateNodes } from 'server/repository/redis/data/updateNodes'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
} & NodeUpdate

export const updateNode = (props: Props): Promise<void> => {
  const { assessment, cycle, countryIso, tableName, variableName, colName, value } = props

  const node: NodeUpdate = { tableName, variableName, colName, value }
  const nodes: Record<TableName, Array<NodeUpdate>> = { [tableName]: [node] }

  return updateNodes({ assessment, cycle, countryIso, nodes })
}
