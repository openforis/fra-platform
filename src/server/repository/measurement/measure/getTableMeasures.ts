import { Objects } from 'utils/objects'

import { Assessment } from 'meta/assessment/assessment'
import { Measure } from 'meta/measurement/measure'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  tableName: string
}

export const getTableMeasures = async (props: Props, client: BaseProtocol = DB): Promise<Array<Measure>> => {
  const { assessment, tableName } = props
  const schemaName = Schemas.getName(assessment)

  return client.map<Measure>(
    `
      select distinct m.*
      from ${schemaName}.row r
      join ${schemaName}."table" t
        on t.id = r.table_id
      join measurement.measure m
        on m.name = r.props ->> 'variableName'
      where t.props ->> 'name' = $1
        and r.props ->> 'variableName' is not null
        and r.props ->> 'variableName' <> '';
      `,
    [tableName],
    (measure) => Objects.camelize(measure)
  )
}
