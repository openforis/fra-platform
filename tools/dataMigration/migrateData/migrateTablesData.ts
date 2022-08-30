import * as pgPromise from 'pg-promise'
import { ITask } from 'pg-promise'

import { Assessment } from '../../../meta/assessment/assessment'
import { Cycle } from '../../../meta/assessment/cycle'
import { Table } from '../../../meta/assessment/table'
import { Objects } from '../../../utils/objects'
import { DBNames } from '../_DBNames'
import { getCreateViewDDL } from './_createDataViews'
import { _getNodeInserts } from './_getNodeInserts'
import { _getNodeInsertsDegradedForest } from './_getNodeInsertsDegradedForest'
import { isBasicTable } from './_repos'
import { getNodeInsertsTableWithODP } from './getNodeInsertsTableWithODP'

export const migrateTablesData = async (
  props: { assessment: Assessment; cycle: Cycle },
  client: ITask<any>
): Promise<void> => {
  const { assessment, cycle } = props
  const schema = DBNames.getAssessmentSchema(assessment.props.name)

  const countryISOs = await client.map<string>(`select * from public.country`, [], (o) => o.country_iso)
  const tables = await client.map<Table>(
    `select *
     from ${schema}.table
     order by id`,
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
  const tableDegradedForest = tables.find((t) => t.props.name === 'degradedForest')
  const tableExtentOfForest = tables.find((t) => t.props.name === 'extentOfForest')
  const tableForestCharacteristics = tables.find((t) => t.props.name === 'forestCharacteristics')
  const tableGrowingStockAvg = tables.find((t) => t.props.name === 'growingStockAvg')
  const tableGrowingStockTotal = tables.find((t) => t.props.name === 'growingStockTotal')

  // get node insert values
  const values = (
    await Promise.all(
      tables
        .filter((table) => isBasicTable(table.props.name))
        .map(async (table) => _getNodeInserts({ assessment, cycle, countryISOs, table }, client))
    )
  ).flat()

  // non basic tables insert
  values.push(
    ...(await _getNodeInsertsDegradedForest({ assessment, cycle, countryISOs, table: tableDegradedForest }, client))
  )
  values.push(
    ...(await getNodeInsertsTableWithODP(
      {
        assessment,
        table: tableExtentOfForest,
        tableNameLegacy: 'eof_fra_values',
        variables: ['forestArea', 'otherWoodedLand'],
        estimated: true,
      },
      client
    ))
  )
  values.push(
    ...(await getNodeInsertsTableWithODP(
      {
        assessment,
        table: tableForestCharacteristics,
        tableNameLegacy: 'foc_fra_values',
        variables: [
          'naturalForestArea',
          'plantationForestArea',
          'plantationForestIntroducedArea',
          'otherPlantedForestArea',
        ],
        estimated: true,
      },
      client
    ))
  )

  values.push(
    ...(await getNodeInsertsTableWithODP(
      {
        assessment,
        table: tableGrowingStockAvg,
        tableNameLegacy: 'growing_stock_avg',
        variables: [
          'naturallyRegeneratingForest',
          'plantationForest',
          'otherPlantedForest',
          'otherWoodedLand',
          'plantedForest',
          'forest',
        ],
      },
      client
    ))
  )
  values.push(
    ...(await getNodeInsertsTableWithODP(
      {
        assessment,
        table: tableGrowingStockTotal,
        tableNameLegacy: 'growing_stock_total',
        variables: [
          'naturallyRegeneratingForest',
          'plantationForest',
          'otherPlantedForest',
          'otherWoodedLand',
          'plantedForest',
          'forest',
        ],
      },
      client
    ))
  )
  // insert nodes
  const schemaCycle = DBNames.getCycleSchema(assessment.props.name, cycle.name)
  const pgp = pgPromise()
  const cs = new pgp.helpers.ColumnSet(['country_iso', 'row_uuid', 'col_uuid', { name: 'value', cast: 'jsonb' }], {
    table: { table: 'node', schema: schemaCycle },
  })
  const query = pgp.helpers.insert(values, cs)
  await client.none(query)

  // create data views
  const queries = await Promise.all(tables.map((table) => getCreateViewDDL({ assessment, cycle, table })))

  await client.query(pgp.helpers.concat(queries))
}
