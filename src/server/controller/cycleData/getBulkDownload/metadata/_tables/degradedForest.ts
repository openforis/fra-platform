import { CycleNames } from 'meta/assessment/cycle/names'
import { TableNames } from 'meta/assessment/table'

import { BulkDownloadTable, BulkDownloadVariableType } from 'server/controller/cycleData/getBulkDownload/types'

import { BulkDownloadTableFactory } from './_types'

export const getDegradedForest: BulkDownloadTableFactory = (props): BulkDownloadTable => {
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
      },
    ],
  }
}
