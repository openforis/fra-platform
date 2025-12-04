import { TableNames } from 'meta/assessment/table'

import { BulkDownloadTableFactory } from './_types'

export const getAnnualReforestation: BulkDownloadTableFactory = (_props) => {
  return {
    tableName: TableNames.annualReforestation,
    variables: [
      {
        csvColumn: '1d_reforestation',
        variableName: 'reforestation',
      },
    ],
  }
}
