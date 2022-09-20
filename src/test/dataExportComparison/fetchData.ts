import { Strings } from '@utils/strings'
import axios from 'axios'

import { countryISOs } from '@test/dataExportComparison/countryIsos'
import { columnsLegacyMapping, tableLegacyMapping } from '@test/dataExportComparison/legacyMapping'
import { ColName, DataLegacy, DataLocal, MetadataLegacy, VariableName } from '@test/dataExportComparison/types'

export const fetchData = async (props: {
  metadataLegacy: MetadataLegacy
  tableName: string
  columns: Array<ColName>
  variables: Array<VariableName>
}): Promise<{ dataLocal: DataLocal; dataLegacy: DataLegacy }> => {
  const { metadataLegacy, tableName, columns, variables } = props

  const variablesLegacy = metadataLegacy[tableName].variables
  const columnsLegacy = columnsLegacyMapping[tableName]
    ? Object.values(columnsLegacyMapping[tableName])
    : metadataLegacy[tableName].columns
  const tableNameLegacy = tableLegacyMapping[tableName] ?? Strings.snakeCase(tableName)

  const urlLegacy = `https://fra-data.fao.org/api/export/fra2020/${tableNameLegacy}`
  const urlLocal = `http://localhost:9001/api/cycle-data/table/table-data`

  const [{ data: dataLegacy }, { data: dataLocal }] = await Promise.all([
    axios.get<DataLegacy>(urlLegacy, {
      params: {
        columns: columnsLegacy,
        countries: countryISOs,
        variables: variablesLegacy.map((v) => v.exportName),
      },
    }),
    axios.get<DataLocal>(urlLocal, {
      params: {
        assessmentName: 'fra',
        cycleName: '2020',
        countryIso: 'WO',
        countryISOs,
        tableNames: [tableName],
        variables,
        columns,
      },
    }),
  ])
  return { dataLocal, dataLegacy }
}
