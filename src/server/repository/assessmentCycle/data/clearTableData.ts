import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { NodeUpdate } from 'meta/data'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  countryISOs: Array<CountryIso>
  cycle: Cycle
  tableName: string
}

export const clearTableData = async (props: Props, client: BaseProtocol = DB): Promise<Array<NodeUpdate>> => {
  const { assessment, cycle, countryISOs, tableName } = props
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)
  const schemaAssessment = Schemas.getName(assessment)

  // TODO: Add value??
  return client.map<NodeUpdate>(
    `
          with rc as (select c.props ->> 'colName'      as col_name,
                         r.props ->> 'variableName' as variable_name,
                         t.props ->> 'name'         as table_name,
                         c.uuid                     as col_id,
                         r.uuid                     as row_id
                  from ${schemaAssessment}.table t
                           join ${schemaAssessment}.row r on (t.id = r.table_id)
                           join ${schemaAssessment}.col c on (r.id = c.row_id)
                  where t.props ->> 'name' = $2 and t.props ->> 'readonly' is distinct from 'true'
                    and r.props ->> 'readonly' is distinct from 'true' and r.props ->> 'type' = 'data'
                    and c.props ->> 'readonly' is distinct from 'true' and c.props ->> 'colType' != 'header'),
           deleted_nodes as (delete from ${schemaCycle}.node n where n.uuid in (
            select n.uuid
            from rc
                     join ${schemaCycle}.node n
                          on (rc.col_id = n.col_uuid and rc.row_id = n.row_uuid)
            where country_iso in ($1:csv))
            returning *)
      select rc.col_name, rc.variable_name, rc.table_name from deleted_nodes dn left join rc on dn.col_uuid = rc.col_id and dn.row_uuid = rc.row_id;
    `,
    [countryISOs, tableName],
    (row) => {
      return Objects.camelize(row)
    }
  )
}
