import { TableNames } from 'meta/assessment/table'

import { BulkDownloadFileFactory } from 'server/controller/cycleData/bulkDownload/metadata/_types'
import {
  BulkDownloadColNode,
  BulkDownloadDatumType,
  BulkDownloadRow,
} from 'server/controller/cycleData/bulkDownload/types'

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

const datumType = BulkDownloadDatumType.string

export const getNonWoodForestProducts: BulkDownloadFileFactory = (_props) => {
  const colNodes: Array<BulkDownloadColNode> = []

  const colNameProducts = ['product_name', 'value', 'category', 'quantity', 'unit']
  Array.from({ length: 10 }, (_, i) => `product_${i + 1}`).forEach((variableName) => {
    const tableName = TableNames.nonWoodForestProductsRemovals
    colNameProducts.forEach((colName) => {
      const csvColumn = getCSVColumn(variableName, colName)
      const column: BulkDownloadColNode = { colName, csvColumn, datumType, tableName, variableName }
      colNodes.push(column)
    })
  })

  const variableOthers = ['all_other_plant_products', 'all_other_animal_products']
  variableOthers.forEach((variableName) => {
    const colName = 'value'
    const tableName = TableNames.nonWoodForestProductsRemovals
    const csvColumn = getCSVColumn(variableName, colName)
    const column: BulkDownloadColNode = { colName, csvColumn, datumType, tableName, variableName }
    colNodes.push(column)
  })

  const currency = 'currency'
  colNodes.push({
    colName: currency,
    csvColumn: `Name of currency`,
    datumType,
    tableName: TableNames.nonWoodForestProductsRemovalsCurrency,
    variableName: currency,
  })

  const row: BulkDownloadRow = { colNodes }

  return { fileName: 'NWFP', includeDeskStudy: true, rows: [row] }
}
