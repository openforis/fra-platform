const R = require('ramda')
const assert = require('chai').assert
const assessment = require('../../common/assessment')

const countryIso = 'ATL'

const getUserInfo = (countryIso, role) => ({roles: [{countryIso, role}]})

describe('assessment', () => {

  it('Allows nothing when no role found', () => {
    assert.deepEqual(
      {},
      assessment.getAllowedStatusTransitions(countryIso, null, 'editing')
    )
  })

  //editing state
  it('Allows nothing when role is COLLABORATOR and state is editing', () => {
    assert.deepEqual(
      {},
      assessment.getAllowedStatusTransitions(countryIso, getUserInfo(countryIso, 'COLLABORATOR'), 'editing')
    )
  })
  it('Returns review as next when user in NATIONAL_CORRESPONDENT and state is editing', () => {
    assert.deepEqual(
      {next: 'review'},
      assessment.getAllowedStatusTransitions(countryIso, getUserInfo(countryIso, 'NATIONAL_CORRESPONDENT'), 'editing')
    )
  })
  it('Allows nothing when user is REVIEWER and state in in editing', () => {
    assert.deepEqual(
      {},
      assessment.getAllowedStatusTransitions(countryIso, getUserInfo(countryIso, 'REVIEWER'), 'editing')
    )
  })
  it('Returns review as next when user in ADMINISTRATOR and state is editing', () => {
    assert.deepEqual(
      {next: 'review'},
      assessment.getAllowedStatusTransitions(countryIso, getUserInfo(countryIso, 'ADMINISTRATOR'), 'editing')
    )
  })

  // review state
  it('Allows nothing when role is COLLABORATOR and state is review', () => {
    assert.deepEqual(
      {},
      assessment.getAllowedStatusTransitions(countryIso, getUserInfo(countryIso, 'COLLABORATOR'), 'review')
    )
  })
  it('Allows nothing when user is NATIONAL_CORRESPONDENT and state is review', () => {
    assert.deepEqual(
      {},
      assessment.getAllowedStatusTransitions(countryIso, getUserInfo(countryIso, 'NATIONAL_CORRESPONDENT'), 'review'))
  })
  it('Returns approval as next and editing as previous when user is REVIEWER and state is review', () => {
    assert.deepEqual(
      {next: 'approval', previous: 'editing'},
      assessment.getAllowedStatusTransitions(countryIso, getUserInfo(countryIso, 'REVIEWER'), 'review')
    )
  })
  it('Returns approval as next and editing as previous when user is ADMINISTRATOR and state is review', () => {
    assert.deepEqual(
      {next: 'approval', previous: 'editing'},
      assessment.getAllowedStatusTransitions(countryIso, getUserInfo(countryIso, 'ADMINISTRATOR'), 'review')
    )
  })

  // approval state
  it('Allows nothing when role is COLLABORATOR and state is approval', () => {
    assert.deepEqual(
      {},
      assessment.getAllowedStatusTransitions(countryIso, getUserInfo(countryIso, 'COLLABORATOR'), 'approval')
    )
  })
  it('Allows nothing when user is NATIONAL_CORRESPONDENT and state is in approval', () => {
    assert.deepEqual(
      {},
      assessment.getAllowedStatusTransitions(countryIso, getUserInfo(countryIso, 'NATIONAL_CORRESPONDENT'), 'approval')
    )
  })
  it('Allows nothing when user is REVIEWER and state is in approval', () => {
    assert.deepEqual(
      {},
      assessment.getAllowedStatusTransitions(countryIso, getUserInfo(countryIso, 'REVIEWER'), 'approval')
    )
  })
  it('Returns review as previous and accepted as next when user is ADMINISTRATOR and state is in approval', () => {
    assert.deepEqual(
      {previous: 'review', next: 'accepted'},
      assessment.getAllowedStatusTransitions(countryIso, getUserInfo(countryIso, 'ADMINISTRATOR'), 'approval')
    )
  })

  // accepted state
  it('Allows nothing when role is COLLABORATOR and state is accepted', () => {
    assert.deepEqual(
      {},
      assessment.getAllowedStatusTransitions(countryIso, getUserInfo(countryIso, 'COLLABORATOR'), 'accepted')
    )
  })
  it('Allows nothing when user is NATIONAL_CORRESPONDENT and state is accepted', () => {
    assert.deepEqual(
      {},
      assessment.getAllowedStatusTransitions(countryIso, getUserInfo(countryIso, 'NATIONAL_CORRESPONDENT'), 'accepted')
    )
  })
  it('Allows nothing when user is REVIEWER and state is accepted', () => {
    assert.deepEqual(
      {},
      assessment.getAllowedStatusTransitions(countryIso, getUserInfo(countryIso, 'REVIEWER'), 'accepted')
    )
  })
  it('Returns approval as previous when user is ADMINISTRATOR and state is accepted', () => {
    assert.deepEqual(
      {previous: 'approval'},
      assessment.getAllowedStatusTransitions(countryIso, getUserInfo(countryIso, 'ADMINISTRATOR'), 'accepted')
    )
  })
})
