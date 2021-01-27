// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'assert'.
const { assert } = require('chai')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getAllowed... Remove this comment to see the full error message
const { getAllowedStatusTransitions, assessmentStatus } = require('../../common/assessment')

const countryIso = 'ATL'

const getUserInfo = (countryIso: any, role: any) => ({ roles: [{ countryIso, role }] })

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('assessment', () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('Allows nothing when no role found', () => {
    assert.deepEqual({}, getAllowedStatusTransitions(countryIso, null, assessmentStatus.editing))
  })

  // editing state
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('Allows nothing when role is COLLABORATOR and state is editing', () => {
    assert.deepEqual(
      {},
      getAllowedStatusTransitions(countryIso, getUserInfo(countryIso, 'COLLABORATOR'), assessmentStatus.editing)
    )
  })
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
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
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('Allows nothing when user is REVIEWER and state in in editing', () => {
    assert.deepEqual(
      {},
      getAllowedStatusTransitions(countryIso, getUserInfo(countryIso, 'REVIEWER'), assessmentStatus.editing)
    )
  })
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('Returns review as next when user in ADMINISTRATOR and state is editing', () => {
    assert.deepEqual(
      { next: assessmentStatus.review },
      getAllowedStatusTransitions(countryIso, getUserInfo(countryIso, 'ADMINISTRATOR'), assessmentStatus.editing)
    )
  })

  // review state
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('Allows nothing when role is COLLABORATOR and state is review', () => {
    assert.deepEqual(
      {},
      getAllowedStatusTransitions(countryIso, getUserInfo(countryIso, 'COLLABORATOR'), assessmentStatus.review)
    )
  })
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
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
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('Returns approval as next and editing as previous when user is REVIEWER and state is review', () => {
    assert.deepEqual(
      { next: assessmentStatus.approval, previous: assessmentStatus.editing },
      getAllowedStatusTransitions(countryIso, getUserInfo(countryIso, 'REVIEWER'), assessmentStatus.review)
    )
  })
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('Returns approval as next and editing as previous when user is ADMINISTRATOR and state is review', () => {
    assert.deepEqual(
      { next: assessmentStatus.approval, previous: assessmentStatus.editing },
      getAllowedStatusTransitions(countryIso, getUserInfo(countryIso, 'ADMINISTRATOR'), assessmentStatus.review)
    )
  })

  // approval state
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('Allows nothing when role is COLLABORATOR and state is approval', () => {
    assert.deepEqual(
      {},
      getAllowedStatusTransitions(countryIso, getUserInfo(countryIso, 'COLLABORATOR'), assessmentStatus.approval)
    )
  })
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
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
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('Allows nothing when user is REVIEWER and state is in approval', () => {
    assert.deepEqual(
      {},
      getAllowedStatusTransitions(countryIso, getUserInfo(countryIso, 'REVIEWER'), assessmentStatus.approval)
    )
  })
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('Returns review as previous and accepted as next when user is ADMINISTRATOR and state is in approval', () => {
    assert.deepEqual(
      { previous: assessmentStatus.review, next: assessmentStatus.accepted },
      getAllowedStatusTransitions(countryIso, getUserInfo(countryIso, 'ADMINISTRATOR'), assessmentStatus.approval)
    )
  })

  // accepted state
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('Allows nothing when role is COLLABORATOR and state is accepted', () => {
    assert.deepEqual(
      {},
      getAllowedStatusTransitions(countryIso, getUserInfo(countryIso, 'COLLABORATOR'), assessmentStatus.accepted)
    )
  })
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
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
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('Allows nothing when user is REVIEWER and state is accepted', () => {
    assert.deepEqual(
      {},
      getAllowedStatusTransitions(countryIso, getUserInfo(countryIso, 'REVIEWER'), assessmentStatus.accepted)
    )
  })
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('Returns review as previous when user is ADMINISTRATOR and state is accepted', () => {
    assert.deepEqual(
      { previous: assessmentStatus.review },
      getAllowedStatusTransitions(countryIso, getUserInfo(countryIso, 'ADMINISTRATOR'), assessmentStatus.accepted)
    )
  })
})
