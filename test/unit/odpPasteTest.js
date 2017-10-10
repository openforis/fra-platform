const R = require('ramda')
const assert = require('chai').assert
const handlePaste = require('../../webapp/originalDataPoint/paste').default

const emptyOdp = {nationalClasses: [{placeHolder: true}]}
const ncColumns = [{name: 'className', type: 'text'}, {name: 'definition', type: 'text'}]

describe('odp paste', () => {
  it('Pastes national classes and definitions', () => {
    const expected =
      [
        {className: 'Closed forest', definition: 'Closed def'},
        {className: 'Open forest', definition: 'Open def'}
      ]

    const pasteData = [['Closed forest', 'Closed def'], ['Open forest', 'Open def']]
    const pasteResult = handlePaste(ncColumns, () => true, emptyOdp, true, pasteData, 0, 0)
    const nationalClassInfo = R.map(
      nc => R.pick(['className', 'definition'], nc),
      R.take(2, pasteResult.updatedOdp.nationalClasses)
    )
    assert.deepEqual(expected, nationalClassInfo)
  })
})
