import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { TableNames } from 'meta/assessment/table'

import { BaseProtocol, DB } from 'server/db/db'
import { OriginalDataPointAdapter } from 'server/db/repository/adapter/originalDataPoint'
import { getNDPSelect } from 'server/db/repository/assessmentCycle/originalDataPoint/_getNDPSelect'
import { ODPCommentColumns } from 'server/db/repository/assessmentCycle/originalDataPoint/commentColumns'

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

  const commentColumnExtent = ODPCommentColumns[TableNames.extentOfForest]
  const commentColumnForestCharacteristics = ODPCommentColumns[TableNames.forestCharacteristics]
  const countryIsoCondition = countryIso ? 'and odp.country_iso = $(countryIso)' : ''

  return client.map<OriginalDataPoint>(
    `
        ${getNDPSelect({ assessment, cycle })}
        where (
          coalesce(odp.${commentColumnExtent}, '') ilike '%href%'
          or coalesce(odp.${commentColumnForestCharacteristics}, '') ilike '%href%'
        )
        ${countryIsoCondition}
    `,
    { countryIso },
    OriginalDataPointAdapter
  )
}
