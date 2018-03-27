import React from 'react'
import R from 'ramda'

import { ThousandSeparatedDecimalInput } from '../../reusableUiComponents/thousandSeparatedDecimalInput'
import { acceptableAsDecimal } from '../../utils/numberInput'
import * as table from '../../traditionalTable/table'
import { div, sub, toFixed } from '../../../common/bignumberUtils'
import { getForestAreaForYear } from '../extentOfForest/extentOfForestHelper'

export const eofNetChange = (extentOfForest, startYear, endYear) => {
  const timeSpan = endYear - startYear
  const startYearEofArea = getForestAreaForYear(extentOfForest, startYear)
  const endYearEofArea = getForestAreaForYear(extentOfForest, endYear)
  const eofNetChange = div(sub(endYearEofArea, startYearEofArea), timeSpan)
  return eofNetChange
}

const calculateMirrorValue = (tableData, extentOfForest, startYear, endYear, row, column, fn) => {
  const netChangeFromExtentOfForest = eofNetChange(extentOfForest, startYear, endYear)
  const value = toFixed(fn(tableData[row][column], netChangeFromExtentOfForest))
  return value ? value.toString() : null
}

export const forestExpansionMirrorCell = (props, extentOfForest, startYear, endYear, rowMirror, functionMirror) => {
  const {
    countryIso,
    tableSpec,
    tableData,
    rowIdx,
    colIdx,
    tableChanged,
    tableValueChanged
  } = props

  return <td className="fra-table__cell">
    <ThousandSeparatedDecimalInput
      numberValue={tableData[rowIdx][colIdx]}
      onChange={(evt) => {
        const newValue = evt.target.value
        if (acceptableAsDecimal(newValue)) {
          const tableDataUpdated = R.update(rowIdx, R.update(colIdx, newValue, tableData[rowIdx]), tableData)

          const mirroredValue = calculateMirrorValue(tableDataUpdated, extentOfForest, startYear, endYear, rowIdx, colIdx, functionMirror)
          const tableDataMirrorUpdated = R.update(rowMirror, R.update(colIdx, mirroredValue, tableDataUpdated[rowMirror]), tableDataUpdated)

          tableChanged(countryIso, tableSpec, tableDataMirrorUpdated)
        }
      }
      }
      onPaste={e => {
        console.log('======== ', e)
      }

      }
    >

    </ThousandSeparatedDecimalInput>
  </td>
}

//TODO
const handlePaste = (countryIso,
                     cellRowIdx,
                     cellColIdx,
                     tableSpec,
                     tableData,
                     tableChanged,
                     tableValueChanged) =>
  (evt) => {
    evt.stopPropagation()
    evt.preventDefault()
    const el = document.createElement('html')
    el.innerHTML = evt.clipboardData.getData('text/html')
    const rows = el.getElementsByTagName('tr')
    if (rows.length > 0) {
      const pastedData =
        R.flatten(
          rows.map((row, rowIdx) =>
            row.getElementsByTagName('td').map((column, colIdx) =>
              ({rowIdx, colIdx, cellData: column.innerText}))
          ))
      const updatedTable = table.fillTableDataStartingFromCell(cellRowIdx, cellColIdx, tableSpec, tableData, pastedData)
      tableChanged(countryIso, tableSpec, updatedTable)
    } else {
      const newValue = evt.clipboardData.getData('text/plain')
      tableValueChanged(countryIso, tableSpec, cellRowIdx, cellColIdx, newValue)
    }
  }
