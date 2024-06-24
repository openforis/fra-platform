import 'tsconfig-paths/register'
import 'dotenv/config'

import { getData } from 'tools/compareDashboardData/getData'
import { APIUtil } from 'tools/utils/API'
import { CSV } from 'tools/utils/CSV'
import { Numbers } from 'utils/numbers'
import { Promises } from 'utils/promises'

import { AreaCode, Areas } from 'meta/area'
import { VariableName } from 'meta/assessment'
import { RecordAssessmentData } from 'meta/data'

import { Logger } from 'server/utils/logger'

import { tables } from './tables'

type CSVData = {
  areaCode: AreaCode
  variableName: VariableName
  columnName: string
  valueProd: string
  valueLocal: string
  diff: string
}

const _toArray = (data1: RecordAssessmentData, data2: RecordAssessmentData, areaCode: AreaCode) => {
  const isCountry = Areas.isISOCountry(areaCode)
  const arr: Array<CSVData> = []

  Object.keys(data1).forEach((assessmentName) =>
    Object.keys(data1[assessmentName]).forEach((cycleName) => {
      const cycleData = data1[assessmentName][cycleName]
      Object.keys(cycleData).forEach((areaCode: AreaCode) => {
        const areaData = cycleData[areaCode]
        Object.keys(areaData).forEach((tableName) => {
          const tableData = areaData[tableName]
          Object.keys(tableData).forEach((columnName) => {
            const columnData = tableData[columnName]
            Object.keys(columnData).forEach((variableName) => {
              if (tableName === 'originalDataPointValue') {
                return
              }
              const meta = tables[tableName]

              if (!meta.columns.includes(columnName) || !meta.variables.includes(variableName)) {
                return
              }

              const valueLocal = columnData[variableName]?.raw
              const valueProd =
                data2[assessmentName][cycleName][areaCode][isCountry ? tableName : 'value_aggregate']?.[columnName]?.[
                  variableName
                ]?.raw

              if (!valueLocal || !valueProd) {
                return
              }

              const diff = Numbers.sub(valueLocal, valueProd).toString()
              arr.push({
                areaCode,
                columnName,
                variableName,
                valueLocal,
                valueProd,
                diff,
              })
            })
          })
        })
      })
    })
  )

  return arr
}

const exec = async () => {
  const { regionGroups, countries } = await APIUtil.getCountries({
    source: 'http://localhost:9000',
    assessmentName: 'fra',
    cycleName: '2020',
  })

  const countryISOs = countries.map((c) => c.countryIso).filter((c) => !c.startsWith('X'))

  const regionCodes = Object.values(regionGroups)
    .flatMap((rg) => rg.regions.map((r) => r.regionCode))
    .filter((r) => r !== 'AT')

  const arr = (
    await Promises.each([...countryISOs, ...regionCodes], async (areaCode) => {
      const { local, prod } = await getData(areaCode)

      return _toArray(local, prod, areaCode)
    })
  ).flat()
  // Enable this line to hide values without diff
  // .filter((d) => !Numbers.eq(d.diff, '0'))

  await CSV.write(arr, 'compareDashboardData')
}

const start = new Date().getTime()
Logger.debug(`========== START COMPARE DASHBOARD DATA ${start}`)

exec().then(() => {
  const end = new Date().getTime()
  Logger.debug(`========== END ${end} ELAPSED ${(end - start) / 1000}s`)
  process.exit(0)
})
