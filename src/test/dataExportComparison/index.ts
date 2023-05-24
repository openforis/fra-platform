import * as fs from 'fs/promises'
import * as JSON2CSV from 'json2csv'

import { TableDatas } from '@meta/data'

import { DB } from '@server/db'

import { compareValue } from '@test/dataExportComparison/compareValue'
import { countryISOs } from '@test/dataExportComparison/countryIsos'
import { fetchData } from '@test/dataExportComparison/fetchData'
import { getMetadata } from '@test/dataExportComparison/getMetadata'
import { getMetadataLegacy } from '@test/dataExportComparison/getMetadataLegacy'
import { ValueDiff } from '@test/dataExportComparison/types'

afterAll(async () => {
  await DB.$pool.end()
})

describe('Data Export comparison', () => {
  test('compare ', async () => {
    const metadataLegacy = getMetadataLegacy()
    const metadata = await getMetadata()
    expect(Object.keys(metadataLegacy).length).toBe(Object.keys(metadata).length)

    const diffs: Array<ValueDiff> = []

    await Promise.all(
      Object.entries(metadata).map(async ([tableName, { columns, variables }]) => {
        const { dataLegacy, dataLocal } = await fetchData({ columns, metadataLegacy, tableName, variables })
        expect(dataLegacy).not.toBeNull()
        expect(dataLocal).not.toBeNull()

        countryISOs.forEach((countryIso) => {
          const countryDataLegacy = dataLegacy[countryIso]
          const countryDataLocal = dataLocal[countryIso]
          if (countryDataLegacy && countryDataLocal) {
            variables.forEach((variable) => {
              columns.forEach((column) => {
                const props = { metadataLegacy, tableName, variable, column, dataLegacy, dataLocal, countryIso }
                const valueDiff = compareValue(props)
                if (valueDiff) diffs.push(valueDiff)
              })
            })
          } else {
            const hasOnlyDataLegacy = countryDataLegacy && !countryDataLocal
            const hasOnlyDataLocal = !countryDataLegacy && countryDataLocal
            const hasDataLocalEmpty = TableDatas.isTableDataEmpty({
              assessmentName: 'fra',
              cycleName: '2020',
              data: dataLocal,
              tableName,
              countryIso,
            })
            if (hasOnlyDataLegacy || (hasOnlyDataLocal && !hasDataLocalEmpty)) {
              const diff: ValueDiff = {
                countryIso,
                tableName,
                colName: 'ALL',
                variableName: 'ALL',
                valueLegacy: hasOnlyDataLegacy ? 'ONLY LEGACY' : '',
                valueLocal: hasOnlyDataLocal ? 'ONLY LOCAL' : '',
              }
              diffs.push(diff)
            }
          }
        })
      })
    )
    const csv = await JSON2CSV.parseAsync(diffs)
    await fs.writeFile('./diffs.csv', csv)
  })
})
