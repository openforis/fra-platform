import { Objects } from 'utils/objects'

import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Measure } from 'meta/measurement/measure'
import { Measures } from 'meta/measurement/measures'

import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

type Props = {
  assessment: Assessment
  cycle: Cycle
  tableName: string
}

export const getTableMeasures = async (props: Props, client: BaseProtocol = DB): Promise<Array<Measure>> => {
  const { assessment, cycle, tableName } = props
  const schemaName = Schemas.getName(assessment)

  const variableNames = await client.map<string>(
    `
      select distinct 
        r.props ->> 'variableName' as variable_name,
        (r.props ->> 'index')::int as idx
      from ${schemaName}.row r
      join ${schemaName}."table" t
        on t.uuid = r.table_uuid
      where t.props ->> 'name' = $1
        and (r.props -> 'cycles') ? $2
        and r.props ->> 'variableName' is not null
        and r.props ->> 'variableName' <> ''
      order by idx nulls last;
    `,
    [tableName, cycle.uuid],
    (row) => row.variable_name
  )

  if (variableNames.length === 0) return []

  const measureNames = variableNames.map((v) => Measures.variableNameToMeasureName(tableName, v))

  return client.map<Measure>(
    `
      with measures as (
        select *
        from unnest($1::text[]) with ordinality as measures(name, ord)
      )
      select
        m.name,
        s.name as system_name
      from measures
      join measurement.measure m
        on m.name = measures.name
      left join measurement.system_of_measurement s
        on m.system_uuid = s.uuid
      order by measures.ord
    `,
    [measureNames],
    (measure) => Objects.camelize(measure)
  )
}
