// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'assert'.
const { assert } = require('chai')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'tableMappi... Remove this comment to see the full error message
const tableMappings = require('../../server/traditionalTable/tableMappings')

const exampleData = {
  rows: {
    names: ['bamboo', 'mangroves', 'rubber_plantations'],
  },
  columns: [
    { name: '1990', type: 'numeric' },
    { name: '2000', type: 'numeric' },
  ],
}

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('tableMappings', () => {
  const mapping = tableMappings.Mapping(exampleData)
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('Gives correct row mappings', () => {
    assert.equal('mangroves', mapping.getRowName(1))
    assert.equal(undefined, mapping.getRowName(99))
    assert.equal(2, mapping.getRowIndex('rubber_plantations'))
    assert.equal(-1, mapping.getRowIndex('not_there'))
  })
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('Gives correct column mappings', () => {
    assert.equal('1990', mapping.getColumnName(0))
    assert.equal(0, mapping.getColumnIndex('1990'))
    assert.equal(undefined, mapping.getColumnName(3))
    assert.equal(-1, mapping.getColumnIndex('not_there'))
  })
})
