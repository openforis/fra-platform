import { BaseProtocol, DB, Schemas } from '@server/db'
import { Objects } from '@core/utils'
import { Assessment, Cycle, OriginalDataPoint } from '@meta/assessment'

export const getOne = async (
  props: { assessment: Assessment; assessmentCycle: Cycle; odpId: number },
  client: BaseProtocol = DB
): Promise<OriginalDataPoint> => {
  const schemaName = Schemas.getNameCycle(props.assessment, props.assessmentCycle)

  return client.one<OriginalDataPoint>(
    `select * from ${schemaName}.original_data_point where id = $1;`,
    [props.odpId],
    Objects.camelize
  )
}
