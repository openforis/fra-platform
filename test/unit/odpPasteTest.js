const R = require('ramda')
const assert = require('chai').assert
const handlePaste = require('../../webapp/originalDataPoint/paste').default

const emptyOdp = {nationalClasses: [{placeHolder: true}]}
const odpWithExistingClasses = {
  nationalClasses: [
    {className: 'Hardwood plantations', definition: 'Forest occurring below ...'},
    {className: 'Coconut plantations', definition: 'Areas under coconut ...'},
    {className: '', placeHolder: true}
  ]
}
const ncColumns = [{name: 'className', type: 'text'}, {name: 'definition', type: 'text'}]
const pasteDataForClasses = [['Closed forest', 'Closed def'], ['Open forest', 'Open def']]

const digOnlyClassDataOutOfOdp = (rowCount, odp) => R.map(
  nc => R.pick(['className', 'definition'], nc),
  R.take(rowCount, odp.nationalClasses)
)


describe('odp paste', () => {
  it('Pastes national classes and definitions', () => {
    const expected =
      [
        {className: 'Closed forest', definition: 'Closed def'},
        {className: 'Open forest', definition: 'Open def'}
      ]
    const pasteResult = handlePaste(ncColumns, () => true, emptyOdp, true, pasteDataForClasses, 0, 0)
    const nationalClassInfo = digOnlyClassDataOutOfOdp(2, pasteResult.updatedOdp)
    assert.deepEqual(expected, nationalClassInfo)
  })

  it('Pastes to second row and column (nc definitions)', () => {
    const result = handlePaste(ncColumns, () => true, odpWithExistingClasses, true, [['Pasted def 1'], ['Pasted def 2']], 1, 1)
    const expected =
      [
        { className: 'Hardwood plantations', definition: 'Forest occurring below ...' },
        { className: 'Coconut plantations', definition: 'Pasted def 1' },
        { className: '', definition: 'Pasted def 2' }
      ]
    assert.deepEqual(expected, digOnlyClassDataOutOfOdp(3, result.updatedOdp))
  })
})
