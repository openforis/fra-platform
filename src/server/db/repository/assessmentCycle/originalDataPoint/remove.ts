import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

import { BaseProtocol, DB } from 'server/db/db'
import { OriginalDataPointAdapter } from 'server/db/repository/adapter/originalDataPoint'
import { Schemas } from 'server/db/schemas'

export const remove = async (
  props: { assessment: Assessment; cycle: Cycle; originalDataPoint: OriginalDataPoint },
  client: BaseProtocol = DB
): Promise<OriginalDataPoint> => {
  const { assessment, cycle, originalDataPoint } = props

  const schemaName = Schemas.getNameCycle(assessment, cycle)

  return client.one<OriginalDataPoint>(
    `delete from ${schemaName}.original_data_point where id = $1 returning *;`,
    [originalDataPoint.id],
    OriginalDataPointAdapter
  )
}
