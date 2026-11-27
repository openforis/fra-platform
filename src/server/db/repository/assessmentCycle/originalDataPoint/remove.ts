import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

type Props = {
  assessment: Assessment
  cycle: Cycle
  originalDataPoint: OriginalDataPoint
}

export const remove = async (
  props: Props,
  client: BaseProtocol = DB
): Promise<Pick<OriginalDataPoint, 'uuid' | 'year'>> => {
  const { assessment, cycle, originalDataPoint } = props

  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle
  const schemaName = Schemas.getSchemaAssessmentCycle({ assessmentName, cycleName })

  return client.one<Pick<OriginalDataPoint, 'uuid' | 'year'>>(
    `
      delete
      from ${schemaName}.original_data_point
      where id = $1
      returning uuid, year
    `,
    [originalDataPoint.id]
  )
}
