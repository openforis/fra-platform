const assert = require('chai').assert
const handlePaste = require('../../webapp/originalDataPoint/paste')

const emptyOdp = {nationalClasses: []}
const ncColumns = [{name: 'className', type: 'text'}, {name: 'definition', type: 'text'}]

describe('odp paste', () => {
  it('Pastes national classes and definitions', () => {
    const expected = {
      nationalClasses: [
        {className: 'Closed Forest', definition: 'Closed def'},
        {className: 'Open forest', definition: 'Open def'}
      ]
    }
    //assert.deepEqual(expected, handlePaste(ncColumns, ))
  })
})
