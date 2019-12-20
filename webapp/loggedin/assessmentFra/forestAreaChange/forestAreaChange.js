import React from 'react'
import * as R from 'ramda'

import { ThousandSeparatedDecimalInput } from '@webapp/components/thousandSeparatedDecimalInput'
import * as table from '@webapp/traditionalTable/table'
import { div, add, sub, toFixed } from '@common/bignumberUtils'
import { getForestAreaForYear } from '@common/extentOfForestHelper'
import { acceptNextDecimal } from '@webapp/utils/numberInput'

const mapIndexed = R.addIndex(R.map)

export const yearIntervals = [
  [1, 1990, 2000],
  [2, 2000, 2010],
  [3, 2010, 2015],
  [4, 2015, 2020]
]

export const eofNetChange = (extentOfForest, startYear, endYear) => {
  const timeSpan = endYear - startYear
  const startYearEofArea = getForestAreaForYear(extentOfForest, startYear)
  const endYearEofArea = getForestAreaForYear(extentOfForest, endYear)
  const eofNetChange = div(sub(endYearEofArea, startYearEofArea), timeSpan)
  return eofNetChange
}

export const calculateMirrorValue = (tableData, extentOfForest, startYear, endYear, row, column, fn) => {
  const netChangeFromExtentOfForest = eofNetChange(extentOfForest, startYear, endYear)
  const value = toFixed(fn(tableData[row][column], netChangeFromExtentOfForest))
  return value ? value.toString() : null
}

export const rowMirrors = [
  {row: 0, rowMirrorIdx: 3, fn: sub},
  {row: 3, rowMirrorIdx: 0, fn: add}
]

const updateTableDataMirrorValue = (tableData, rowIdx, colIdx, extentOfForest) => {
  const rowMirror = R.find(R.propEq('row', rowIdx), rowMirrors)
  if (rowMirror) {
    const yearInterval = yearIntervals[colIdx - 1]
    const {fn, rowMirrorIdx} = rowMirror

    const mirroredValue = calculateMirrorValue(tableData, extentOfForest, yearInterval[1], yearInterval[2], rowIdx, colIdx, fn)
    return R.update(rowMirrorIdx, R.update(colIdx, mirroredValue, tableData[rowMirrorIdx]), tableData)
  } else {
    return tableData
  }

}

export const decimalInputCell = (props, extentOfForest, validator, disabled = false) => {
  const {
    countryIso,
    tableSpec,
    tableData,
    rowIdx,
    colIdx,
    tableChanged
  } = props

  const valid = validator ? validator(props, rowIdx, colIdx).valid : true
  return <td className={`fra-table__cell ${valid ? '' : 'error'}`}>
    <ThousandSeparatedDecimalInput
      numberValue={tableData[rowIdx][colIdx]}
      disabled={disabled}
      onChange={evt => {
        const targetValue = evt.target.value
        handleChange(countryIso, rowIdx, colIdx, tableSpec, tableData, tableChanged, extentOfForest, targetValue)
      }}
      onPaste={
        handlePaste(
          countryIso,
          rowIdx,
          colIdx,
          tableSpec,
          tableData,
          tableChanged,
          extentOfForest)
      }
    />
  </td>
}

const handleChange =
  (countryIso, rowIdx, colIdx, tableSpec, tableData, tableChanged, extentOfForest, newValue) => {

    const nextDecimal = acceptNextDecimal(newValue, tableData[rowIdx][colIdx])

    const updatedTableData = R.pipe(
      R.update(rowIdx, R.update(colIdx, nextDecimal, tableData[rowIdx])),
      R.partialRight(updateTableDataMirrorValue, [rowIdx, colIdx, extentOfForest])
    )(tableData)

    tableChanged(countryIso, tableSpec, updatedTableData)

  }

const handlePaste =
  (countryIso, rowIdx, colIdx, tableSpec, tableData, tableChanged, extentOfForest) =>
    evt => {
      evt.stopPropagation()
      evt.preventDefault()

      const calculateDeforestation = rowIdx === 0

      const el = document.createElement('html')
      el.innerHTML = evt.clipboardData.getData('text/html')
      const rows = el.getElementsByTagName('tr')

      if (rows.length > 0) {
        const pastedData =
          R.flatten(
            mapIndexed((row, rowI) =>
                mapIndexed((column, colI) =>
                    ({rowIdx: rowI, colIdx: colI, cellData: column.innerText}),
                  row.getElementsByTagName('td'))
              , rows)
          )
        const pastedTableData = table.fillTableDataStartingFromCell(rowIdx, colIdx, tableSpec, tableData, pastedData)

        const updatedTableData = R.reduce(
          (data, yearInterval) => {
            const c = yearInterval[0]
            const r = calculateDeforestation ? 0 : 3

            return updateTableDataMirrorValue(data, r, c, extentOfForest)
          },
          pastedTableData,
          yearIntervals
        )

        tableChanged(countryIso, tableSpec, updatedTableData)
      } else {
        const newValue = evt.clipboardData.getData('text/plain')
        handleChange(countryIso, rowIdx, colIdx, tableSpec, tableData, tableChanged, extentOfForest, newValue)
      }
    }
