import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { BulkDownloadODPData } from 'server/controller/cycleData/getBulkDownload/types'
import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

type Props = {
  assessment: Assessment
  countryISOs: Array<CountryIso>
  cycle: Cycle
}

export const getBulkDownloadData = async (props: Props, client: BaseProtocol = DB): Promise<BulkDownloadODPData> => {
  const { assessment, countryISOs, cycle } = props
  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle

  const schemaCycle = Schemas.getSchemaAssessmentCycle({ assessmentName, cycleName })

  return client.one<BulkDownloadODPData>(
    `with odp_min_max as
            (select odp.country_iso, max(odp.year) as max_year, min(odp.year) as min_year
             from ${schemaCycle}.original_data_point odp
             where odp.country_iso in ($1:csv)
             group by 1)
     select jsonb_object_agg(
              odp.country_iso,
              jsonb_build_object(
                'countryIso', odp.country_iso,
                'dataSourceMethods', odp.data_source_methods,
                'maxYear', o.max_year::varchar,
                'minYear', o.min_year::varchar
              )
            ) as data
     from odp_min_max o
            left join ${schemaCycle}.original_data_point odp
                      on odp.country_iso = o.country_iso and odp.year = o.max_year;`,
    [countryISOs],
    ({ data }) => data
  )
}
