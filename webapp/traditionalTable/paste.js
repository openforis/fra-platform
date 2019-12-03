import * as R from 'ramda'
import * as table from './table'

const mapIndexed = R.addIndex(R.map)

export const handlePaste = (countryIso,
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
        mapIndexed(
          (row, rowIdx) =>
            mapIndexed((column, colIdx) =>
              ({rowIdx, colIdx, cellData: column.innerText}), row.getElementsByTagName('td')),
          rows))
    const updatedTable = table.fillTableDataStartingFromCell(cellRowIdx, cellColIdx, tableSpec, tableData, pastedData)
    tableChanged(countryIso, tableSpec, updatedTable)
  } else {
    const newValue = evt.clipboardData.getData('text/plain')
    tableValueChanged(countryIso, tableSpec, cellRowIdx, cellColIdx, newValue)
  }
}
