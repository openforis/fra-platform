import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { TableNames } from 'meta/assessment/table'

import { BaseProtocol, DB } from 'server/db/db'
import { OriginalDataPointAdapter } from 'server/db/repository/adapter/originalDataPoint'
import { Schemas } from 'server/db/schemas'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  year: string
}

export const getOne = async (props: Props, client: BaseProtocol = DB): Promise<OriginalDataPoint | undefined> => {
  const { assessment, countryIso, cycle, year } = props

  const schemaName = Schemas.getNameCycle(assessment, cycle)

  return client.oneOrNone<OriginalDataPoint>(
    `select odp.id
          , odp.uuid
          , odp.country_iso
          , odp.year
          , odp.national_classes
          , odp.values
          , jsonb_build_object(
        '${TableNames.extentOfForest}', odp.comments_extentofforest,
        '${TableNames.forestCharacteristics}', odp.comments_forestcharacteristics
            ) as comments
          , d.value as data_sources
     from ${schemaName}.original_data_point odp
            left join ${schemaName}.descriptions d
                      on odp.uuid = d.section_uuid and d.name = 'dataSources'
     where odp.country_iso = $(countryIso) and odp.year = $(year);`,
    { countryIso, year },
    OriginalDataPointAdapter
  )
}
