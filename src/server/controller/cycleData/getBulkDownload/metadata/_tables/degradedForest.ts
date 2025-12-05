import { CycleNames } from 'meta/assessment/cycle/names'
import { TableNames } from 'meta/assessment/table'

import { BulkDownloadTableFactory } from 'server/controller/cycleData/getBulkDownload/metadata/_types'
import { BulkDownloadVariableType } from 'server/controller/cycleData/getBulkDownload/types'

export const getDegradedForest: BulkDownloadTableFactory = (props) => {
  const { cycle } = props

  const tableName =
    cycle.name === CycleNames._2020 ? TableNames.degradedForest : TableNames.degradedForestMonitoring2025
  const variableName = cycle.name === CycleNames._2020 ? 'does_country_monitor' : 'doesYourCountryMonitor'
  const colName = cycle.name === CycleNames._2020 ? 'answer' : 'doesYourCountryMonitor'

  return {
    tableName,
    variables: [
      {
        colName,
        variableName,
        csvColumn: '5c_y_n',
        type: BulkDownloadVariableType.string,
        colsVariable: [{ colName }],
      },
    ],
  }
}
