// import { ColSpec, RowSpec, TypeSpec } from '@webapp/sectionSpec'
//
// const getColHeader =
//   (colsLength: number, sliceEnd: number, sliceStart: number, rowIdx: number) =>
//   (col: ColSpec, colIdx: number, cols: Array<ColSpec>): ColSpec => {
//     const { colSpan } = col
//     const colStart = cols
//       .slice(0, colIdx)
//       .reduce<number>((idxCurrent, colCurrent) => colCurrent.colSpan + idxCurrent, 0)
//
//     // column is occupying all data columns
//     if (colSpan === colsLength) {
//       return {
//         ...col,
//         colSpan: colSpan - (sliceEnd - sliceStart),
//       }
//     }
//
//     // column belongs to the range or it's the column of the first row
//     if ((colStart >= sliceStart && colStart < sliceEnd) || (rowIdx === 0 && colIdx === 0)) {
//       return col
//     }
//
//     return null
//   }
//
// const getRowHeader =
//   (colsLength: number, sliceStart: number, sliceEnd: number) =>
//   (row: RowSpec, rowIdx: number): RowSpec => {
//     const { cols } = row
//
//     if (cols.length === colsLength) {
//       return {
//         ...row,
//         cols: cols.slice(sliceStart, sliceEnd),
//       }
//     }
//
//     return {
//       ...row,
//       cols: cols.map(getColHeader(colsLength, sliceEnd, sliceStart, rowIdx)).filter((col) => !!col),
//     }
//   }
//
// const getRowData =
//   (sliceStart: number, sliceEnd: number) =>
//   (row: RowSpec): RowSpec => {
//     const { cols } = row
//
//     if (cols) {
//       const colsHeader = cols.filter((col) => col.type === TypeSpec.header)
//       const colsData = cols.filter((col) => col.type !== TypeSpec.header).slice(sliceStart, sliceEnd)
//
//       return {
//         ...row,
//         cols: [...colsHeader, ...colsData],
//       }
//     }
//
//     return row
//   }
//
// export const getRowsSliced = (
//   breakPoints: Array<number>,
//   breakPointIdx: number,
//   rows: Array<RowSpec>
// ): Array<RowSpec> => {
//   const rowsHeader = rows.filter((row) => row.type === TypeSpec.header)
//   const rowsData = rows.filter((row) => row.type === TypeSpec.data)
//   const rowsRest = rows.filter((row) => row.type !== TypeSpec.header && row.type !== TypeSpec.data)
//   const colsLength = rowsData[0].cols.filter((col) => col.type !== TypeSpec.header).length
//
//   const sliceStart = breakPoints[breakPointIdx]
//   const sliceEnd = breakPoints[breakPointIdx + 1] ? breakPoints[breakPointIdx + 1] : colsLength
//
//   return [
//     ...rowsHeader.map(getRowHeader(colsLength, sliceStart, sliceEnd)),
//     ...rowsData.map(getRowData(sliceStart, sliceEnd)),
//     ...rowsRest,
//   ]
// }
