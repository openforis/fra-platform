const R = require('ramda')
const assert = require('chai').assert
const assessment = require('../../common/assessment')

describe('assessment', () => {
  it('Allows nothing when role is COLLABORATOR', () => {
    assert.deepEqual({}, assessment.getAllowedStatusTransitions({role: 'COLLABORATOR'}, 'editing'))
  })
  it('Allows nothing when no role found', () => {
    assert.deepEqual({}, assessment.getAllowedStatusTransitions(null, 'editing'))
  })
  it('Returns review when in editing', () => {
    assert.deepEqual({next: 'review'}, assessment.getAllowedStatusTransitions({role: 'NATIONAL_CORRESPONDENT'}, 'editing'))
  })
  it('Returns accepted as next when user is reviewer and state is editing', () => {
    assert.deepEqual({next: 'accepted'}, assessment.getAllowedStatusTransitions({role: 'REVIEWER'}, 'review'))
  })
  it('Returns editing as previous when user is NATIONAL_CORRESPONDENT and state is review', () => {
    assert.deepEqual({previous: 'editing'}, assessment.getAllowedStatusTransitions({role: 'NATIONAL_CORRESPONDENT'}, 'review'))
  })
  it('Returns review as previous when user is REVIEWER and state is accepted', () => {
    assert.deepEqual({previous: 'review'}, assessment.getAllowedStatusTransitions({role: 'REVIEWER'}, 'accepted'))
  })
  it('Allows nothing when user is NATIONAL_CORRESPONDENT and state is accepted', () => {
    assert.deepEqual({}, assessment.getAllowedStatusTransitions({role: 'NATIONAL_CORRESPONDENT'}, 'accepted'))
  })
})
