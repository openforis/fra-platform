import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

const getColHeader = (colsLength, sliceEnd, sliceStart, rowIdx) => (col, colIdx, cols) => {
  const colSpan = col[SectionSpec.KEYS_COL.colSpan]
  const colStart = cols
    .slice(0, colIdx)
    .reduce((idxCurrent, colCurrent) => colCurrent[SectionSpec.KEYS_COL.colSpan] + idxCurrent, 0)

  // column is occupying all data columns
  if (colSpan === colsLength) {
    return {
      ...col,
      [SectionSpec.KEYS_COL.colSpan]: colSpan - (sliceEnd - sliceStart),
    }
  }

  // column belongs to the range or it's the column of the first row
  if ((colStart >= sliceStart && colStart < sliceEnd) || (rowIdx === 0 && colIdx === 0)) {
    return col
  }

  return null
}

const getRowHeader = (colsLength, sliceStart, sliceEnd) => (row, rowIdx) => {
  const cols = row[SectionSpec.KEYS_ROW.cols]

  if (cols.length === colsLength) {
    return {
      ...row,
      [SectionSpec.KEYS_ROW.cols]: cols.slice(sliceStart, sliceEnd),
    }
  }

  return {
    ...row,
    [SectionSpec.KEYS_ROW.cols]: cols
      .map(getColHeader(colsLength, sliceEnd, sliceStart, rowIdx))
      .filter((col) => !!col),
  }
}

const getRowData = (sliceStart, sliceEnd) => (row) => {
  const cols = row[SectionSpec.KEYS_ROW.cols]

  if (cols) {
    const colsHeader = cols.filter(SectionSpec.isHeader)
    const colsData = cols.filter(SectionSpec.isNotHeader).slice(sliceStart, sliceEnd)

    return {
      ...row,
      [SectionSpec.KEYS_ROW.cols]: [...colsHeader, ...colsData],
    }
  }

  return row
}

export const getRowsSliced = (breakPoints, breakPointIdx, rows) => {
  const rowsHeader = rows.filter(SectionSpec.isHeader)
  const rowsData = rows.filter(SectionSpec.isData)
  const rowsRest = rows.filter((row) => SectionSpec.isNotHeader(row) && SectionSpec.isNotData(row))
  const colsLength = rowsData[0][SectionSpec.KEYS_ROW.cols].filter(SectionSpec.isNotHeader).length

  const sliceStart = breakPoints[breakPointIdx]
  const sliceEnd = breakPoints[breakPointIdx + 1] ? breakPoints[breakPointIdx + 1] : colsLength

  return [
    ...rowsHeader.map(getRowHeader(colsLength, sliceStart, sliceEnd)),
    ...rowsData.map(getRowData(sliceStart, sliceEnd)),
    ...rowsRest,
  ]
}
