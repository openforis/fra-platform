import { CountryIso } from 'meta/area'
import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { RecordCountryData } from 'meta/data'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryISOs: Array<CountryIso>
  tableNames: Array<string>
}

export const getTableDataLastApproved = (props: Props, client: BaseProtocol = DB): Promise<RecordCountryData> => {
  const { assessment, countryISOs, cycle, tableNames } = props
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)
  const schemaAssessment = Schemas.getName(assessment)

  return client.one<RecordCountryData>(
    `
        with activities as (
            select al.country_iso,
                   t.props ->> 'name' as table_name,
                   r.props ->> 'variableName' as variable_name,
                   c.props ->> 'colName' as col_name,
                   al.target -> 'value' as value,
                   row_number() over (partition by al.target ->> 'colUuid' order by al.time desc) as row_number
            from public.activity_log al
            left join ${schemaCycle}.country c on al.country_iso = c.country_iso
            left join public.assessment a               on al.assessment_uuid = a.uuid
            left join public.assessment_cycle ac        on a.id = ac.assessment_id and al.cycle_uuid = ac.uuid
            left join ${schemaAssessment}.col c         on (al.target ->> 'colUuid')::uuid = c.uuid
            left join ${schemaAssessment}.row r         on c.row_id = r.id
            left join ${schemaAssessment}.table t       on r.table_id = t.id
            where al.message in ('${ActivityLogMessage.nodeValueCalculatedUpdate}', '${ActivityLogMessage.nodeValueEstimate}', '${ActivityLogMessage.nodeValueUpdate}')
              and al.country_iso in ($1:csv)
              and a.props ->> 'name' = $2
              and ac.name = $3
              and al.time < c.last_in_accepted
              and t.props ->> 'name' in ($4:csv)
        ),
        agg1 as (
            select country_iso,
                   table_name,
                   col_name,
                   jsonb_object_agg(variable_name, value) as variable_data
            from activities
            where row_number = 1
            group by country_iso, table_name, col_name
        ),
        agg2 as (
            select country_iso,
                   table_name,
                   jsonb_object_agg(col_name, variable_data) as col_data
            from agg1
            group by country_iso, table_name
        ),
        agg3 as (
            select country_iso,
                   jsonb_object_agg(table_name, col_data) as table_data
            from agg2
            group by country_iso
        )
        select jsonb_object_agg(country_iso, table_data) as data
        from agg3;
    `,
    [countryISOs, assessment.props.name, cycle.name, tableNames],
    ({ data }) => data ?? {}
  )
}
