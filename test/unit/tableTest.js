/**
 * @deprecated
 * traditional table is not used, and sectionSpec is favored (dataTable)
 * Todo: Test dataTable
 */
// const assert = require('chai').assert
// const R = require('ramda')
// const table = require('@webapp/app/assessment/components/traditionalTable/table')
//
// //Not a realistic dataset in that these rhs etc. will actually be null...
// const dataToSlice = [['', 'h1', 'h2'], ['rh1', 1, 2], ['rh2', 3, 4], ['total', 'tbd', 'tbd']]
// const specWithSlice = {
//   valueSlice: {
//     rowStart: 1,
//     rowEnd: -1,
//     columnStart: 1,
//     columnEnd: undefined
//   }
// }
//
// describe('table', () => {
//   it('Slices first and last rows and first column away', () => {
//     const expected = [[1, 2], [3, 4]]
//     const actual = table.getValueSliceFromTableData(specWithSlice, dataToSlice)
//     assert(R.equals(expected, actual), `Expected ${JSON.stringify(expected)} actual ${JSON.stringify(actual)}`)
//   })
//   it('Returns all data if there is no slicing', () => {
//     const actual = table.getValueSliceFromTableData({}, dataToSlice)
//     assert(R.equals(dataToSlice, actual), `Expected ${JSON.stringify(dataToSlice)} actual ${JSON.stringify(actual)}`)
//   })
//   it('Creates the full, larger data matrix from a slice and tableSpec', () => {
//     const expected = [['', 'h1', 'h2'], ['rh1', 4, 5], ['rh2', 6, 7], ['total', 'tbd', 'tbd']]
//     const actual = table.fillTableDatafromValueSlice(specWithSlice, dataToSlice, [[4, 5], [6, 7]])
//     assert(R.equals(expected, actual), `Expected ${JSON.stringify(expected)} actual ${JSON.stringify(actual)}`)
//   })
// })
