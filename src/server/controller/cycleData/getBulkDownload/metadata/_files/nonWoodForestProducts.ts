import { TableNames } from 'meta/assessment/table'

import { BulkDownloadFileFactory } from 'server/controller/cycleData/getBulkDownload/metadata/_types'
import {
  BulkDownloadFile,
  BulkDownloadFileColumn,
  BulkDownloadVariableType,
} from 'server/controller/cycleData/getBulkDownload/types'

const toTitleCase = (str: string): string => {
  return str
    .split('_')
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(' ')
}

const getCSVColumn = (variableName: string, colName: string): string => {
  const prefix = `NWFP ${variableName.split('_')[1]}`
  if (colName === 'product_name') {
    return `${prefix} Name`
  }

  if (variableName.includes('product_') && colName === 'value') {
    return `${prefix} Value`
  }

  if (colName === 'category') {
    return `${prefix} Category`
  }

  return `${toTitleCase(variableName)} ${toTitleCase(colName)}`
}

const type = BulkDownloadVariableType.string

export const getNonWoodForestProducts: BulkDownloadFileFactory = (_props) => {
  const columns: BulkDownloadFile['columns'] = []

  const colNameProducts = ['product_name', 'value', 'category', 'quantity', 'unit']
  Array.from({ length: 10 }, (_, i) => `product_${i + 1}`).forEach((variableName) => {
    const tableName = TableNames.nonWoodForestProductsRemovals
    colNameProducts.forEach((colName) => {
      const csvColumn = getCSVColumn(variableName, colName)
      const column: BulkDownloadFileColumn = { colName, csvColumn, tableName, type, variableName }
      columns.push(column)
    })
  })

  const variableOthers = ['all_other_plant_products', 'all_other_animal_products']
  variableOthers.forEach((variableName) => {
    const colName = 'value'
    const tableName = TableNames.nonWoodForestProductsRemovals
    const csvColumn = getCSVColumn(variableName, colName)
    const column: BulkDownloadFileColumn = { colName, csvColumn, tableName, type, variableName }
    columns.push(column)
  })

  const currency = 'currency'
  columns.push({
    colName: currency,
    csvColumn: `Name of currency`,
    tableName: TableNames.nonWoodForestProductsRemovalsCurrency,
    type,
    variableName: currency,
  })

  return { columns, fileName: 'NWFP' }
}
