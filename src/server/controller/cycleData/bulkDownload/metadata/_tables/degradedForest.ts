import { CycleNames } from 'meta/assessment/cycle/names'
import { TableNames } from 'meta/assessment/table'

import {
  BulkDownloadFileYearsBuilder,
  ColNodeYearsFactory,
} from 'server/controller/cycleData/bulkDownload/metadata/_tables/_fileYearsBuilder'
import { BulkDownloadDatumType } from 'server/controller/cycleData/bulkDownload/types'

export class DegradedForestBuilder extends BulkDownloadFileYearsBuilder {
  getBaseColNodes(): Array<ColNodeYearsFactory> {
    const { cycle } = this.props
    const is2020 = cycle.name === CycleNames._2020
    const tableName = is2020 ? TableNames.degradedForest : TableNames.degradedForestMonitoring2025
    const variableName = is2020 ? 'does_country_monitor' : 'doesYourCountryMonitor'
    const colName = is2020 ? 'answer' : 'doesYourCountryMonitor'

    return [
      {
        colName,
        csvColumn: '5c_y_n',
        datumType: BulkDownloadDatumType.string,
        singleFileColumns: [{ colName, csvColumn: colName }],
        tableName,
        variableName,
      },
    ]
  }
}
