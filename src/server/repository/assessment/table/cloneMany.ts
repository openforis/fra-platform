import * as pgPromise from 'pg-promise'

import { Assessment, Cycle, Table, Tables } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycleSource: Cycle
  cycleTarget: Cycle
  tables: Array<Table>
}

/**
 * This method clones tables.
 *
 * @param props
 */
export const cloneMany = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, cycleSource, cycleTarget, tables } = props
  const updates: Array<{ id: number; props: Table['props'] }> = []

  tables.forEach((table) => {
    const _props = Tables.cloneProps({ cycleSource, cycleTarget, table })
    updates.push({ id: table.id, props: _props })
  })

  const pgp = pgPromise()
  const schemaAssessment = Schemas.getName(assessment)
  const columns = ['?id', { cast: 'jsonb', name: 'props' }]
  const options = { table: { table: 'table', schema: schemaAssessment } }
  const cs = new pgp.helpers.ColumnSet(columns, options)

  const query = `${pgp.helpers.update(updates, cs)} WHERE v.id = t.id`
  await client.query(query)
}
