import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { RecordCountryData } from 'meta/data/RecordAssessmentData'

export const mergeRecordTableData = (data: RecordCountryData, newData: RecordCountryData): RecordCountryData => {
  return Object.keys(newData).reduce<RecordCountryData>((acc, countryIso: CountryIso) => {
    const countryData = newData[countryIso]
    Object.keys(countryData).forEach((tableName: string) => {
      const table = countryData?.[tableName] ?? {}
      Object.keys(table).forEach((colName) => {
        const col = table[colName]
        Object.keys(col).forEach((variableName) => {
          const exists = !Objects.isEmpty(acc[countryIso]?.[tableName]?.[colName]?.[variableName])

          if (!exists) {
            const path = [countryIso, tableName, colName, variableName]
            const value = col[variableName]
            Objects.setInPath({ obj: acc, path, value })
          }
        })
      })
    })
    return acc
  }, data)
}
