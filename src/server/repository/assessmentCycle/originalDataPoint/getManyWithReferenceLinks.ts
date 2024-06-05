import { Objects } from 'utils/objects'

import { Assessment, Cycle, OriginalDataPoint } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
}

export const getManyWithReferenceLinks = async (
  props: Props,
  client: BaseProtocol = DB
): Promise<Array<OriginalDataPoint>> => {
  const { assessment, cycle } = props

  const schemaName = Schemas.getNameCycle(assessment, cycle)

  return client.map<OriginalDataPoint>(
    `
        select * from ${schemaName}.original_data_point
        where data_source_references ilike '%href%'
    `,
    [],
    (row) => Objects.camelize(row)
  )
}
