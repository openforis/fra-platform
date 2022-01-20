import * as pgPromise from 'pg-promise'
import { ITask } from 'pg-promise'

import { Objects } from '../../../core/utils/objects'
import { Assessment, Table } from '../../../meta/assessment'
import { DBNames } from '../_DBNames'
import { _getNodeInserts } from './_getNodeInserts'
import { getCreateViewDDL } from './_createDataViews'
import { isBasicTable } from './_repos'
import { _getNodeInsertsDegradedForest } from './_getNodeInsertsDegradedForest'

export const migrateTablesData = async (props: { assessment: Assessment }, client: ITask<any>): Promise<void> => {
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

  // get node insert values
  const values = (
    await Promise.all(
      tables.filter(isBasicTable).map(async (table) => _getNodeInserts({ assessment, countryISOs, table }, client))
    )
  ).flat()

  const tableDegradedForest = tables.find((t) => t.props.name === 'degradedForest')
  values.push(...(await _getNodeInsertsDegradedForest({ assessment, countryISOs, table: tableDegradedForest }, client)))

  // insert nodes
  const schemaCycle = DBNames.getCycleSchema(assessment.props.name, assessment.cycles[0].name)
  const pgp = pgPromise()
  const cs = new pgp.helpers.ColumnSet(['country_iso', 'row_uuid', 'col_uuid', { name: 'value', cast: 'jsonb' }], {
    table: { table: 'node', schema: schemaCycle },
  })
  const query = pgp.helpers.insert(values, cs)
  await client.none(query)

  // create data views
  const queries = await Promise.all(
    tables.filter(isBasicTable).map((table) => getCreateViewDDL({ assessment, table }, client))
  )
  queries.push(await getCreateViewDDL({ assessment, table: tableDegradedForest }, client))
  await client.query(pgp.helpers.concat(queries))
}
