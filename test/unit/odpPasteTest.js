const R = require('ramda')
const assert = require('chai').assert
const handlePaste = require('../../webapp/app/assessment/fra/sections/originalDataPoint/paste').default

/*
 * NOTE: This test uses otherLand-concepts which are no longer actually used in
 * originalDataPoint view. However, the logic of skipping irrelevant rows
 * when pasting is still valid
 */

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

const digOnlyCertainFieldsOutOfOdp = (rowCount, odp, fields) =>
  R.map(
    nc => R.pick(fields, nc),
    R.take(rowCount, odp.nationalClasses)
  )

const digOnlyClassDataOutOfOdp = (rowCount, odp) =>
  digOnlyCertainFieldsOutOfOdp(rowCount, odp, ['className', 'definition'])

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

  it('Skips rows which are not valid for certain table (and are not visible either in the UI', () => {
    const otherLandCharacteristicsCols = [
      {name: 'otherLandPalmsPercent', type: 'integer'},
      {name: 'otherLandTreeOrchardsPercent', type: 'integer'},
      {name: 'otherLandAgroforestryPercent', type: 'integer'},
      {name: 'otherLandTreesUrbanSettingsPercent', type: 'integer'}
    ]
    const originalOdp = {
      nationalClasses: [
        {className: 'Closed forest'},
        {className: 'Open forest', otherLandPercent: 10},
        {className: 'Hardwood plantations'},
        {className: 'Coconut plantations', otherLandPercent: 25},
        {className: '', placeHolder: true}
      ]
    }
    const expected =
      [
        {className: 'Closed forest'},
        {className: 'Open forest', otherLandPercent: 10, otherLandPalmsPercent: 10, otherLandTreeOrchardsPercent: 20},
        {className: 'Hardwood plantations'},
        {className: 'Coconut plantations', otherLandPercent: 25, otherLandPalmsPercent: 30, otherLandTreeOrchardsPercent: 40}
      ]
    const result = handlePaste(
      otherLandCharacteristicsCols,
      (nc) => nc.otherLandPercent > 0,
      originalOdp,
      false,
      [['10', '20'], ['30', '40']],
      1, //Note: this is the index of the visible row in UI (first which matches otherLandPercent > 0)
      0
    )
    assert.deepEqual(
      digOnlyCertainFieldsOutOfOdp(
        4,
        result.updatedOdp,
        ['className', 'otherLandPercent', 'otherLandPalmsPercent', 'otherLandTreeOrchardsPercent']
      ),
      expected
    )
  })
})
