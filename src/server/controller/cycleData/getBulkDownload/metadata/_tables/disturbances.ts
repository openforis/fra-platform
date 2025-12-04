import { TableNames } from 'meta/assessment/table'

import { BulkDownloadTableFactory } from './_types'

export const getDisturbances: BulkDownloadTableFactory = (_props) => {
  return {
    tableName: TableNames.disturbances,
    variables: [
      {
        csvColumn: '5a_insect',
        variableName: 'insects',
      },
      {
        csvColumn: '5a_diseases',
        variableName: 'diseases',
      },
      {
        csvColumn: '5a_weather',
        variableName: 'severe_weather_events',
      },
      {
        csvColumn: '5a_other',
        variableName: 'other',
      },
    ],
  }
}
