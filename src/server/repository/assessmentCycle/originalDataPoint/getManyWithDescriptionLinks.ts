import { Objects } from 'utils/objects'

import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { TableNames } from 'meta/assessment/table'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
}

export const getManyWithDescriptionLinks = async (
  props: Props,
  client: BaseProtocol = DB
): Promise<Array<OriginalDataPoint>> => {
  const { assessment, cycle } = props

  const schemaName = Schemas.getNameCycle(assessment, cycle)

  return client.map<OriginalDataPoint>(
    `
        select * from ${schemaName}.original_data_point
        where coalesce(comments ->> '${TableNames.extentOfForest}', '') ilike '%href%'
           or coalesce(comments ->> '${TableNames.forestCharacteristics}', '') ilike '%href%'
    `,
    [],
    (row) => Objects.camelize(row)
  )
}
