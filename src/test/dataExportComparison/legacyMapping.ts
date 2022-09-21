import { ColName, TableName } from '@test/dataExportComparison/types'

export const tableLegacyMapping: Record<string, string> = {
  growingStockTotal: 'growing_stock',
}
// TableName->ColName->LegacyExportName
export const columnsLegacyMapping: Record<TableName, Record<ColName, ColName>> = {
  annualReforestation: {
    '1990-2000': '1990_2000',
    '2000-2010': '2000_2010',
    '2010-2015': '2010_2015',
    '2015-2020': '2015_2020',
  },
  forestPolicy: {
    national: 'national_yes_no',
    subnational: 'sub_national_yes_no',
  },
  forestAreaChange: {
    '1990-2000': '1990_2000',
    '2000-2010': '2000_2010',
    '2010-2015': '2010_2015',
    '2015-2020': '2015_2020',
  },
}

// TODO: this is to fix
export const columnsMapping: Record<TableName, Record<ColName, ColName>> = {
  annualReforestation: {
    '1990-2000': '1990_2000',
    '2000-2010': '2000_2010',
    '2010-2015': '2010_2015',
    '2015-2020': '2015_2020',
  },
  forestPolicy: {
    national: 'national_yes_no',
    subnational: 'sub_national_yes_no',
  },
  forestAreaChange: {
    '1990-2000': '1990_2000',
    '2000-2010': '2000_2010',
    '2010-2015': '2010_2015',
    '2015-2020': '2015_2020',
  },
}
