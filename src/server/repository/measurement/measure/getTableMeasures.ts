import { Objects } from 'utils/objects'

import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Measure } from 'meta/measurement/measure'
import { Measures } from 'meta/measurement/measures'

import { BaseProtocol, DB, Schemas } from 'server/db'

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
      select distinct r.props ->> 'variableName' as variable_name
      from ${schemaName}.row r
      join ${schemaName}."table" t
        on t.id = r.table_id
      where t.props ->> 'name' = $1
        and (r.props -> 'cycles') ? $2
        and r.props ->> 'variableName' is not null
        and r.props ->> 'variableName' <> '';
    `,
    [tableName, cycle.uuid],
    (row) => row.variable_name
  )

  if (variableNames.length === 0) return []

  const measureNames = variableNames.map((v) => Measures.variableNameToMeasureName(tableName, v))

  return client.map<Measure>(
    `
      select distinct *
      from measurement.measure
      where name in ($1:csv);
    `,
    [measureNames],
    (measure) => Objects.camelize(measure)
  )
}
