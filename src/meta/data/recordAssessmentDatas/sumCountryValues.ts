import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { RecordAssessmentData, RecordTableData } from 'meta/data/RecordAssessmentData'

const _BASE = { raw: '0.00' }
const _SKIP = ['originalDataPointValue']

// Sum given CountryData to
export const sumCountryValues = (a: RecordAssessmentData): RecordTableData => {
  return Object.keys(a).reduce<RecordTableData>((acc, assessmentName) => {
    const assessment = a[assessmentName]
    Object.keys(assessment).forEach((cycleName) => {
      const cycle = assessment[cycleName]
      Object.keys(cycle).forEach((countryISO: CountryIso) => {
        const country = cycle[countryISO]
        Object.keys(country).forEach((tableName) => {
          const table = country[tableName]
          Object.keys(table).forEach((colName) => {
            const col = table[colName]
            Object.keys(col).forEach((variableName) => {
              const variable = col[variableName]
              if (variable.raw && !_SKIP.includes(tableName)) {
                if (!acc[tableName]?.[colName]?.[variableName]) {
                  const path = [tableName, colName, variableName]
                  Objects.setInPath({ obj: acc, path, value: _BASE })
                }

                const value = {
                  raw: Numbers.add(acc[tableName][colName][variableName].raw, variable.raw).toString(),
                  type: 'node_sum',
                }
                const path = [tableName, colName, variableName]
                Objects.setInPath({ obj: acc, path, value })
              }
            })
          })
        })
      })
    })
    return acc
  }, {})
}
