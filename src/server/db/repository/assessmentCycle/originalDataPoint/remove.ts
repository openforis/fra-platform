import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

import { getOne } from './getOne'

type Props = {
  assessment: Assessment
  cycle: Cycle
  originalDataPoint: OriginalDataPoint
}

export const remove = async (props: Props, client: BaseProtocol = DB): Promise<OriginalDataPoint> => {
  const { assessment, cycle, originalDataPoint } = props
  const { countryIso, year } = originalDataPoint

  const schemaName = Schemas.getNameCycle(assessment, cycle)

  await client.query(
    `
      delete
      from ${schemaName}.original_data_point
      where id = $1
    `,
    [originalDataPoint.id]
  )

  return getOne({ assessment, countryIso, cycle, year: String(year) }, client)
}
