import { Objects } from 'utils/objects'

import { Assessment } from 'meta/assessment/assessment'
import { Dimension } from 'meta/measurement/dimension'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  tableName: string
}

export const getTableDimensions = async (props: Props, client: BaseProtocol = DB): Promise<Array<Dimension>> => {
  const { assessment, tableName } = props
  const schemaName = Schemas.getName(assessment)

  return client.map<Dimension>(
    `
      select distinct d.*
      from ${schemaName}."table" t
      cross join lateral
        jsonb_each(t.props -> 'columnNames') as cn(cycle_uuid, names)
      cross join lateral
        jsonb_array_elements_text(cn.names) as dim(name)
      join measurement.dimension d
        on d.name = dim.name
      where t.props ->> 'name' = $1
        and t.props -> 'columnNames' is not null;
    `,
    [tableName],
    (dimension) => Objects.camelize(dimension)
  )
}
