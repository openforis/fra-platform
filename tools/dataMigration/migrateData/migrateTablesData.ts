import * as pgPromise from 'pg-promise'

import { Assessment } from '../../../src/meta/assessment/assessment'
import { Cycle } from '../../../src/meta/assessment/cycle'
import { Table } from '../../../src/meta/assessment/table'
import { BaseProtocol } from '../../../src/server/db'
import { Objects } from '../../../src/utils/objects'
import { DBNames } from '../_DBNames'
import { getCreateViewDDL } from './_createDataViews'
import { _getNodeInserts } from './_getNodeInserts'
// import { _getNodeInsertsDegradedForest } from './_getNodeInsertsDegradedForest'
import { isBasicTable, skipPanEuropean } from './_repos'
import { migrateFRATablesData } from './migrateFRATablesData'
// import { getNodeInsertsTableWithODP } from './getNodeInsertsTableWithODP'

export const migrateTablesData = async (
  props: { assessment: Assessment; cycle: Cycle },
  client: BaseProtocol,
  legacySchema = '_legacy'
): Promise<void> => {
  const { assessment, cycle } = props
  const schema = DBNames.getAssessmentSchema(assessment.props.name)

  const countryISOs = await client.map<string>(
    `
        select *
        from public.country`,
    [],
    (o) => o.country_iso
  )

  const tables = await client.map<Table>(
    `select t.*
     from ${schema}."table" t
     where t.props -> 'cycles' ? '${cycle.uuid}'
     order by t.id`,
    [],
    // @ts-ignore
    (table) => {
      const { props, ...rest } = table
      return {
        ...Objects.camelize(rest),
        props,
      }
    }
  )

  // get node insert values
  const values = (
    await Promise.all(
      tables
        .filter((table) => isBasicTable(table.props.name))
        .filter((table) => skipPanEuropean(table.props.name, cycle.name, assessment.props.name))
        .map(async (table) => _getNodeInserts({ assessment, cycle, countryISOs, table, legacySchema }, client))
    )
  ).flat()

  if (!schema.includes('paneuropean')) {
    await migrateFRATablesData({ assessment, cycle, countryISOs, tables, values }, client)
  }

  // insert nodes
  const schemaCycle = DBNames.getCycleSchema(assessment.props.name, cycle.name)
  const pgp = pgPromise()
  const cs = new pgp.helpers.ColumnSet(['country_iso', 'row_uuid', 'col_uuid', { name: 'value', cast: 'jsonb' }], {
    table: { table: 'node', schema: schemaCycle },
  })
  const query = pgp.helpers.insert(values, cs)
  await client.none(query)
  // create data views
  const queries = await Promise.all(tables.map((table) => getCreateViewDDL({ assessment, cycle, table }, client)))

  await client.query(pgp.helpers.concat(queries))
}
