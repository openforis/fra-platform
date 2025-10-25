import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

import { BaseProtocol, DB, Schemas } from 'server/db'

import { getOne } from './getOne'

export const updateDescription = async (
  props: {
    assessment: Assessment
    cycle: Cycle
    originalDataPoint: OriginalDataPoint
  },
  client: BaseProtocol = DB
): Promise<OriginalDataPoint> => {
  const {
    assessment,
    cycle,
    originalDataPoint: { commentsExtentOfForest, commentsForestCharacteristics, countryIso, id, year },
  } = props

  const schemaName = Schemas.getNameCycle(assessment, cycle)

  await client.one<OriginalDataPoint>(
    `
      update ${schemaName}.original_data_point
      set comments_extent_of_forest = $2,
          comments_forest_characteristics = $3
      where id = $1
      returning *
  `,
    [id, commentsExtentOfForest || '', commentsForestCharacteristics || '']
  )

  return getOne({ assessment, cycle, countryIso, year: String(year) }, client)
}
