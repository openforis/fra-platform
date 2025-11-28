import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { NodeUpdate } from 'meta/data/nodeUpdates'

import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

type Props = {
  assessment: Assessment
  countryISOs: Array<CountryIso>
  cycle: Cycle
  tableName: string
}

export const clearTableData = async (props: Props, client: BaseProtocol = DB): Promise<Array<NodeUpdate>> => {
  const { assessment, countryISOs, cycle, tableName } = props
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)
  const schemaAssessment = Schemas.getName(assessment)

  // TODO: Add value??
  return client.map<NodeUpdate>(
    `
          with rc as (select c.props ->> 'colName'      as col_name,
                         r.props ->> 'variableName' as variable_name,
                         t.props ->> 'name'         as table_name,
                         c.uuid                     as col_uuid,
                         r.uuid                     as row_uuid
                  from ${schemaAssessment}.table t
                           join ${schemaAssessment}.row r on (t.uuid = r.table_uuid)
                           join ${schemaAssessment}.col c on (r.uuid = c.row_uuid)
                  where t.props ->> 'name' = $2 and t.props ->> 'readonly' is distinct from 'true'
                    and r.props ->> 'readonly' is distinct from 'true' and r.props ->> 'type' = 'data'
                    and c.props ->> 'readonly' is distinct from 'true' and c.props ->> 'colType' != 'header'),
           deleted_nodes as (delete from ${schemaCycle}.node n where n.uuid in (
            select n.uuid
            from rc
                     join ${schemaCycle}.node n
                          on (rc.col_uuid = n.col_uuid and rc.row_uuid = n.row_uuid)
            where country_iso in ($1:csv))
            returning *)
      select rc.col_name, rc.variable_name, rc.table_name from deleted_nodes dn left join rc on dn.col_uuid = rc.col_uuid and dn.row_uuid = rc.row_uuid;
    `,
    [countryISOs, tableName],
    (row) => {
      return Objects.camelize(row)
    }
  )
}
