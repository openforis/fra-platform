import { assert } from 'chai'
import * as tableMappings from '../../server/dataTable/tableMappings'

const exampleData = {
  rows: {
    names: ['bamboo', 'mangroves', 'rubber_plantations'],
  },
  columns: [
    { name: '1990', type: 'numeric' },
    { name: '2000', type: 'numeric' },
  ],
}

describe('tableMappings', () => {
  const mapping = tableMappings.Mapping(exampleData)
  it('Gives correct row mappings', () => {
    assert.equal('mangroves', mapping.getRowName(1))
    assert.equal(undefined, mapping.getRowName(99))
    assert.equal(2, mapping.getRowIndex('rubber_plantations'))
    assert.equal(-1, mapping.getRowIndex('not_there'))
  })
  it('Gives correct column mappings', () => {
    assert.equal('1990', mapping.getColumnName(0))
    assert.equal(0, mapping.getColumnIndex('1990'))
    assert.equal(undefined, mapping.getColumnName(3))
    assert.equal(-1, mapping.getColumnIndex('not_there'))
  })
})
