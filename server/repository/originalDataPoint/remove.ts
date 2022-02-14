import { BaseProtocol, DB, Schemas } from '@server/db'
import { Objects } from '@core/utils'
import { Assessment, Cycle, OriginalDataPoint } from '@meta/assessment'

export const remove = async (
  props: { assessment: Assessment; assessmentCycle: Cycle; originalDataPoint: OriginalDataPoint },
  client: BaseProtocol = DB
): Promise<OriginalDataPoint | null> => {
  const { assessment, assessmentCycle, originalDataPoint } = props

  const schemaName = Schemas.getNameCycle(assessment, assessmentCycle)

  return client.oneOrNone<OriginalDataPoint | null>(
    `delete from ${schemaName}.original_data_point where id = $1 returning *;`,
    [originalDataPoint.id],
    Objects.camelize
  )
}
