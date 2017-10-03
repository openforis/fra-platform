import R from 'ramda'

const noValues = (tableData, columnIndex, rowIndexes) =>
  R.all(rowIndex => R.isNil(tableData[rowIndex][columnIndex]), rowIndexes)

export const totalSum = (tableData, columnIndex, rowIndexes) => {
  if (noValues(tableData, columnIndex, rowIndexes)) {
    return null
  }
  return R.reduce((sum, rowIndex) => {
      const value = tableData[rowIndex][columnIndex]
      if (!R.isNil(value))
        return sum + value
      else
        return sum
    },
    0,
    rowIndexes
  )
}
