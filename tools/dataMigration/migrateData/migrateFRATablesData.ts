import { ITask } from 'pg-promise'

import { Assessment, Cycle } from '../../../src/meta/assessment'
import { Table } from '../../../src/meta/assessment/table'
import { _getNodeInsertsDegradedForest } from './_getNodeInsertsDegradedForest'
import { getNodeInsertsTableWithODP } from './getNodeInsertsTableWithODP'

export const migrateFRATablesData = async (
  props: { assessment: Assessment; cycle: Cycle; countryISOs: string[]; tables: Table[]; values: any[] },
  client: ITask<any>
): Promise<void> => {
  const { assessment, cycle, countryISOs, tables, values } = props

  const tableDegradedForest = tables.find((t) => t.props.name === 'degradedForest')
  const tableExtentOfForest = tables.find((t) => t.props.name === 'extentOfForest')
  const tableForestCharacteristics = tables.find((t) => t.props.name === 'forestCharacteristics')
  const tableGrowingStockAvg = tables.find((t) => t.props.name === 'growingStockAvg')
  const tableGrowingStockTotal = tables.find((t) => t.props.name === 'growingStockTotal')

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
}
