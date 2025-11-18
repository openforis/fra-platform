import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

import { BaseProtocol, DB } from 'server/db/db'
import { OriginalDataPointAdapter } from 'server/db/repository/adapter/originalDataPoint'
import { getOne } from 'server/db/repository/assessmentCycle/originalDataPoint/getOne'
import { Schemas } from 'server/db/schemas'

export const deleteNationalClass = async (
  props: { assessment: Assessment; cycle: Cycle; id: string; index: number },
  client: BaseProtocol = DB
): Promise<OriginalDataPoint> => {
  const { assessment, cycle, id, index } = props

  const schemaName = Schemas.getNameCycle(assessment, cycle)

  const originalDataPoint = await client.one<OriginalDataPoint>(
    `
      update ${schemaName}.original_data_point odp
      set national_classes = national_classes - $2:raw
      where id = $1
      returning *
  `,
    [id, Number(index)],
    OriginalDataPointAdapter
  )

  const { countryIso, year } = originalDataPoint

  return getOne({ assessment, cycle, countryIso, year: String(year) }, client)
}
