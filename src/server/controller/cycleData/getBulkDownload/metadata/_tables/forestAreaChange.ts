import { TableNames } from 'meta/assessment/table'

import { BulkDownloadTableFactory } from './_types'

export const getForestAreaChange: BulkDownloadTableFactory = (_props) => {
  return {
    tableName: TableNames.forestAreaChange,
    variables: [
      {
        csvColumn: '1d_expansion',
        variableName: 'forest_expansion',
      },
      {
        csvColumn: '1d_afforestation',
        variableName: 'afforestation',
      },
      {
        csvColumn: '1d_nat_exp',
        variableName: 'natural_expansion',
      },
      {
        csvColumn: '1d_deforestation',
        variableName: 'deforestation',
      },
    ],
  }
}
