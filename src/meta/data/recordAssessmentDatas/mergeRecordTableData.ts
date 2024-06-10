import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { RecordTableData } from 'meta/data/RecordAssessmentData'

// TODO This will change

export const mergeRecordTableData = (data: RecordTableData, newData: RecordTableData): RecordTableData => {
  return Object.keys(newData).reduce<RecordTableData>((acc, tableName) => {
    const table = newData[tableName]
    Object.keys(table).forEach((colName) => {
      const col = table[colName]
      Object.keys(col).forEach((variableName) => {
        const exists = !Objects.isEmpty(acc[tableName]?.[colName]?.[variableName])

        if (!exists) {
          const path = [tableName, colName, variableName]
          Objects.setInPath({ obj: acc, path, value: col[variableName] })
        } else {
          const path = [tableName, colName, variableName, 'raw']
          const value = Numbers.add(
            acc[tableName]?.[colName]?.[variableName].raw,
            newData[tableName]?.[colName]?.[variableName].raw
          )
          Objects.setInPath({ obj: acc, path, value })
        }
      })
    })
    return acc as RecordTableData
  }, data)
}
