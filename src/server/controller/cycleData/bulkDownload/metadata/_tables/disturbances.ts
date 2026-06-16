import { TableNames } from 'meta/assessment/table'

import {
  BulkDownloadFileYearsBuilder,
  ColNodeYearsFactory,
} from 'server/controller/cycleData/bulkDownload/metadata/_tables/_fileYearsBuilder'

export class DisturbancesBuilder extends BulkDownloadFileYearsBuilder {
  getBaseColNodes(): Array<ColNodeYearsFactory> {
    const tableName = TableNames.disturbances

    return [
      {
        csvColumn: '5a_insect',
        tableName,
        variableName: 'insects',
      },
      {
        csvColumn: '5a_diseases',
        tableName,
        variableName: 'diseases',
      },
      {
        csvColumn: '5a_weather',
        tableName,
        variableName: 'severe_weather_events',
      },
      {
        csvColumn: '5a_other',
        tableName,
        variableName: 'other',
      },
    ]
  }
}
