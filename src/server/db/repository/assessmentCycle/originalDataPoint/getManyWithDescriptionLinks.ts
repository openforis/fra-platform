import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { TableNames } from 'meta/assessment/table'

import { BaseProtocol, DB } from 'server/db/db'
import { OriginalDataPointAdapterDeprecated } from 'server/db/repository/adapter/originalDataPoint'
import { ODPCommentColumns } from 'server/db/repository/assessmentCycle/originalDataPoint/commentColumns'
import { Schemas } from 'server/db/schemas'

type Props = {
  assessment: Assessment
  countryIso?: CountryIso
  cycle: Cycle
}

export const getManyWithDescriptionLinks = async (
  props: Props,
  client: BaseProtocol = DB
): Promise<Array<OriginalDataPoint>> => {
  const { assessment, countryIso, cycle } = props

  const schemaName = Schemas.getNameCycle(assessment, cycle)

  const commentColumnExtent = ODPCommentColumns[TableNames.extentOfForest]
  const commentColumnForestCharacteristics = ODPCommentColumns[TableNames.forestCharacteristics]
  const countryIsoCondition = countryIso ? 'and country_iso = $(countryIso)' : ''

  return client.map<OriginalDataPoint>(
    `
        select * from ${schemaName}.original_data_point
        where (
          coalesce(${commentColumnExtent}, '') ilike '%href%'
          or coalesce(${commentColumnForestCharacteristics}, '') ilike '%href%'
        )
        ${countryIsoCondition}
    `,
    { countryIso },
    OriginalDataPointAdapterDeprecated
  )
}
