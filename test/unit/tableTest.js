const assert = require('chai').assert
const R = require('ramda')
const table = require('../../webapp/traditionalTable/table')

const dataToSlice = [['', 'h1', 'h2'], ['rh1', 1, 2], ['rh2', 3, 4], ['total', 'tbd', 'tbd']]
//Not a full tableSpec
const specForSlicing = {}

describe('table', () => {
  it('Slices last row and first column away', () => {
    const expected = [[1, 2], [3, 4]]
    const actual = table.getValueSliceFromTableValues({
      valueSlice: {
        rowStart: 1,
        rowEnd: -1,
        columnStart: 1,
        columnEnd: undefined
      }
    }, dataToSlice)
    assert(R.equals(expected, actual), `Expected ${JSON.stringify(expected)} actual ${JSON.stringify(actual)}`)
  })
  it('Returns all data if there is no slicing', () => {
    const actual = table.getValueSliceFromTableValues({}, dataToSlice)
    assert(R.equals(dataToSlice, actual), `Expected ${JSON.stringify(dataToSlice)} actual ${JSON.stringify(actual)}`)
  })
})
