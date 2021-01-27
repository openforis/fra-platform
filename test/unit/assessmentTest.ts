import { assert } from 'chai'
import { getAllowedStatusTransitions, assessmentStatus } from '../../common/assessment'

const countryIso = 'ATL'

const getUserInfo = (countryIso: any, role: any) => ({ roles: [{ countryIso, role }] })

describe('assessment', () => {
  it('Allows nothing when no role found', () => {
    assert.deepEqual({}, getAllowedStatusTransitions(countryIso, null, assessmentStatus.editing))
  })

  // editing state
  it('Allows nothing when role is COLLABORATOR and state is editing', () => {
    assert.deepEqual(
      {},
      getAllowedStatusTransitions(countryIso, getUserInfo(countryIso, 'COLLABORATOR'), assessmentStatus.editing)
    )
  })
  it('Returns review as next when user in NATIONAL_CORRESPONDENT and state is editing', () => {
    assert.deepEqual(
      { next: assessmentStatus.review },
      getAllowedStatusTransitions(
        countryIso,
        getUserInfo(countryIso, 'NATIONAL_CORRESPONDENT'),
        assessmentStatus.editing
      )
    )
  })
  it('Allows nothing when user is REVIEWER and state in in editing', () => {
    assert.deepEqual(
      {},
      getAllowedStatusTransitions(countryIso, getUserInfo(countryIso, 'REVIEWER'), assessmentStatus.editing)
    )
  })
  it('Returns review as next when user in ADMINISTRATOR and state is editing', () => {
    assert.deepEqual(
      { next: assessmentStatus.review },
      getAllowedStatusTransitions(countryIso, getUserInfo(countryIso, 'ADMINISTRATOR'), assessmentStatus.editing)
    )
  })

  // review state
  it('Allows nothing when role is COLLABORATOR and state is review', () => {
    assert.deepEqual(
      {},
      getAllowedStatusTransitions(countryIso, getUserInfo(countryIso, 'COLLABORATOR'), assessmentStatus.review)
    )
  })
  it('Allows nothing when user is NATIONAL_CORRESPONDENT and state is review', () => {
    assert.deepEqual(
      {},
      getAllowedStatusTransitions(
        countryIso,
        getUserInfo(countryIso, 'NATIONAL_CORRESPONDENT'),
        assessmentStatus.review
      )
    )
  })
  it('Returns approval as next and editing as previous when user is REVIEWER and state is review', () => {
    assert.deepEqual(
      { next: assessmentStatus.approval, previous: assessmentStatus.editing },
      getAllowedStatusTransitions(countryIso, getUserInfo(countryIso, 'REVIEWER'), assessmentStatus.review)
    )
  })
  it('Returns approval as next and editing as previous when user is ADMINISTRATOR and state is review', () => {
    assert.deepEqual(
      { next: assessmentStatus.approval, previous: assessmentStatus.editing },
      getAllowedStatusTransitions(countryIso, getUserInfo(countryIso, 'ADMINISTRATOR'), assessmentStatus.review)
    )
  })

  // approval state
  it('Allows nothing when role is COLLABORATOR and state is approval', () => {
    assert.deepEqual(
      {},
      getAllowedStatusTransitions(countryIso, getUserInfo(countryIso, 'COLLABORATOR'), assessmentStatus.approval)
    )
  })
  it('Allows nothing when user is NATIONAL_CORRESPONDENT and state is in approval', () => {
    assert.deepEqual(
      {},
      getAllowedStatusTransitions(
        countryIso,
        getUserInfo(countryIso, 'NATIONAL_CORRESPONDENT'),
        assessmentStatus.approval
      )
    )
  })
  it('Allows nothing when user is REVIEWER and state is in approval', () => {
    assert.deepEqual(
      {},
      getAllowedStatusTransitions(countryIso, getUserInfo(countryIso, 'REVIEWER'), assessmentStatus.approval)
    )
  })
  it('Returns review as previous and accepted as next when user is ADMINISTRATOR and state is in approval', () => {
    assert.deepEqual(
      { previous: assessmentStatus.review, next: assessmentStatus.accepted },
      getAllowedStatusTransitions(countryIso, getUserInfo(countryIso, 'ADMINISTRATOR'), assessmentStatus.approval)
    )
  })

  // accepted state
  it('Allows nothing when role is COLLABORATOR and state is accepted', () => {
    assert.deepEqual(
      {},
      getAllowedStatusTransitions(countryIso, getUserInfo(countryIso, 'COLLABORATOR'), assessmentStatus.accepted)
    )
  })
  it('Allows nothing when user is NATIONAL_CORRESPONDENT and state is accepted', () => {
    assert.deepEqual(
      {},
      getAllowedStatusTransitions(
        countryIso,
        getUserInfo(countryIso, 'NATIONAL_CORRESPONDENT'),
        assessmentStatus.accepted
      )
    )
  })
  it('Allows nothing when user is REVIEWER and state is accepted', () => {
    assert.deepEqual(
      {},
      getAllowedStatusTransitions(countryIso, getUserInfo(countryIso, 'REVIEWER'), assessmentStatus.accepted)
    )
  })
  it('Returns review as previous when user is ADMINISTRATOR and state is accepted', () => {
    assert.deepEqual(
      { previous: assessmentStatus.review },
      getAllowedStatusTransitions(countryIso, getUserInfo(countryIso, 'ADMINISTRATOR'), assessmentStatus.accepted)
    )
  })
})
