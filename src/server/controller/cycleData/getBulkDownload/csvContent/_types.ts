import { ColName } from 'meta/assessment/col'
import { TableName } from 'meta/assessment/table'

import { BulkDownloadTable, BulkDownloadVariable } from 'server/controller/cycleData/getBulkDownload/types'

export type CSVColValue = Pick<BulkDownloadTable, 'getDatum'> &
  BulkDownloadVariable & {
    colName: ColName
    tableName: TableName
  }

export type CSVRowOptionsBase = {
  includeDeskStudy?: boolean
  includeClimaticDomain?: boolean
  colValues: Array<CSVColValue>
}

// multiple variables per row
export type CSVRowHeaderOptionsVariables = CSVRowOptionsBase & {
  includeYear?: boolean
}
export type CSVRowOptionsVariables = CSVRowHeaderOptionsVariables & {
  year: string
}

// single variable per row - base options for now
export type CSVRowHeaderOptionsVariable = CSVRowOptionsBase & {}
export type CSVRowOptionsVariable = CSVRowHeaderOptionsVariable & {}

export type CSVRowHeaderOptions = CSVRowHeaderOptionsVariables | CSVRowHeaderOptionsVariable
export type CSVRowOptions = CSVRowOptionsVariable | CSVRowOptionsVariables
