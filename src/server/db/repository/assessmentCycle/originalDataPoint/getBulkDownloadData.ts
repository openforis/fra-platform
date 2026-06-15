import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { SectionNames } from 'meta/assessment/section'

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

  const query = `
    with odp_min_max as
      (select odp.country_iso
            , max(odp.year) as max_year
            , min(odp.year) as min_year
       from ${schemaCycle}.original_data_point odp
       where odp.country_iso in ($1:csv)
       group by 1)
       , data_source_types_disagg as
      (select odp.country_iso
            , odp.year
            , d.section_uuid
            , jsonb_array_elements_text(jsonb_array_elements(d.value) -> 'type') as types
       from odp_min_max omm
              left join ${schemaCycle}.original_data_point odp
                        on odp.year = omm.max_year and odp.country_iso = omm.country_iso
              left join ${schemaCycle}.descriptions d
                        on d.section_name = '${SectionNames.nationalDataPoint}' and
                           d.name = '${CommentableDescriptionName.dataSources}' and d.section_uuid = odp.uuid)
       , data_source_types as
      (select d.country_iso, jsonb_agg(distinct d.types) as types
       from data_source_types_disagg d
       group by 1)
    select jsonb_object_agg(
             o.country_iso,
             jsonb_build_object(
               'countryIso', o.country_iso,
               'dataSourceTypes', dst.types,
               'maxYear', o.max_year::varchar,
               'minYear', o.min_year::varchar
             )
           ) as data
    from odp_min_max o
           left join data_source_types dst
                     on o.country_iso = dst.country_iso
    ;`

  return client.one<BulkDownloadODPData>(query, [countryISOs], ({ data }) => data)
}
