import { CountryIso } from '@meta/area'
import { Assessment, Cycle, Table } from '@meta/assessment'

import { BaseProtocol, DB, Schemas } from '@server/db'

type Props = {
  assessment: Assessment
  countryISOs: Array<CountryIso>
  cycle: Cycle
  table: Table
  columnNames: string[]
}

export const deleteNodeValues = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, cycle, countryISOs, table, columnNames } = props
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)
  const schemaAssessment = Schemas.getName(assessment)

  await client.none(
    `
        with rc as (select c.uuid as col_id, r.uuid as row_id from ${schemaAssessment}.table t
                    join ${schemaAssessment}.row r on (t.id = r.table_id)
                    join ${schemaAssessment}.col c on (r.id = c.row_id)
                    where
                        t.props->>'name' = $3
                      and r.props ->> 'readonly' is null and r.props ->> 'type' = 'data'
                      and c.props ->> 'colName' in ($2:csv)
        )

        delete from ${schemaCycle}.node nn where nn.uuid in (
            select n.uuid
            from rc
                     join ${schemaCycle}.node n on (rc.col_id = n.col_uuid and rc.row_id = n.row_uuid)
            where country_iso in ($1:csv)
              and n.value ->> 'calculated' is null
        )
    `,
    [countryISOs, columnNames, table.props.name]
  )
}
