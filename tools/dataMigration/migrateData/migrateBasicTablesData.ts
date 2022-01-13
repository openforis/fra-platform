import { ITask } from 'pg-promise'
import * as pgPromise from 'pg-promise'

import { Objects } from '../../../core/utils/objects'
import { Assessment, Table } from '../../../meta/assessment'
import { DBNames } from '../_DBNames'
import { _getNodeInserts, NodeRow } from './_getNodeInserts'
import { getCreateViewDDL } from './_createDataViews'

export const migrateBasicTablesData = async (props: { assessment: Assessment }, client: ITask<any>): Promise<void> => {
  const { assessment } = props
  const schema = DBNames.getAssessmentSchema(assessment.props.name)
  const tables = await client.map<Table>(
    `select *
       from ${schema}.table
       order by id`,
    [],
    // @ts-ignore
    Objects.camelize
  )

  const countryISOs = await client.map<string>(`select * from ${schema}.country`, [], (o) => o.country_iso)

  // TODO: sustainable development tables have no name, only calculated rows
  const isBasicTable = (table: Table): boolean =>
    !['extentOfForest', 'forestCharacteristics', 'growingStock'].includes(table.props.name) && table.props.name !== ''

  // get node insert values
  const values = await Promise.all<Array<NodeRow>>(
    tables.filter(isBasicTable).map(async (table) => _getNodeInserts({ assessment, countryISOs, table }, client))
  )

  // insert nodes
  const schemaCycle = DBNames.getCycleSchema(assessment.props.name, assessment.cycles[0].name)
  const pgp = pgPromise()
  const cs = new pgp.helpers.ColumnSet(['country_iso', 'row_uuid', 'col_uuid', { name: 'value', cast: 'jsonb' }], {
    table: { table: 'node', schema: schemaCycle },
  })
  const query = pgp.helpers.insert(values.flat(), cs)
  await client.none(query)

  // create data views
  const queries = await Promise.all(
    tables.filter(isBasicTable).map((table) => getCreateViewDDL({ assessment, table }, client))
  )
  await client.query(pgp.helpers.concat(queries))
}
