// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'assert'.
const { assert } = require('chai')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'roles'.
const { roles } = require('../../common/countryRole')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'assessment... Remove this comment to see the full error message
const { assessmentStatus } = require('../../common/assessment')
const {
  // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'isUserRole... Remove this comment to see the full error message
  isUserRoleAllowedToEditAssessmentData,
  // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'isUserRole... Remove this comment to see the full error message
  isUserRoleAllowedToEditAssessmentComments,
} = require('../../common/assessmentRoleAllowance')

const allStatuses = R.reject((status: any) => status === 'changing', R.values(assessmentStatus))
const allStatusesButThese = (butThese: any) => R.reject((status: any) => R.contains(status, butThese), allStatuses)

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('assessmentEdit', () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('Nonexisting roles are not allowed to do anything', () => {
    R.forEach((status: any) => {
      assert.isFalse(isUserRoleAllowedToEditAssessmentData({ role: 'NONE' }, status))
      assert.isFalse(isUserRoleAllowedToEditAssessmentComments({ role: 'NONE' }, status))
      assert.isFalse(isUserRoleAllowedToEditAssessmentData(null, status))
      assert.isFalse(isUserRoleAllowedToEditAssessmentComments(null, status))
    }, allStatuses)
  })
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('Admins can do anything', () => {
    R.forEach((status: any) => {
      assert.isTrue(
        isUserRoleAllowedToEditAssessmentData({ role: 'ADMINISTRATOR' }, status),
        `Admin should be allowed to edit ${status} data`
      )
      assert.isTrue(
        isUserRoleAllowedToEditAssessmentComments({ role: 'ADMINISTRATOR' }, status),
        `Admin should be allowed to edit ${status} comments`
      )
    }, allStatuses)
  })
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('Collaborators can only edit editing', () => {
    assert.isTrue(isUserRoleAllowedToEditAssessmentData({ role: 'COLLABORATOR' }, 'editing'))
    assert.isTrue(isUserRoleAllowedToEditAssessmentComments({ role: 'COLLABORATOR' }, 'editing'))
    R.forEach((status: any) => {
      assert.isFalse(isUserRoleAllowedToEditAssessmentData({ role: 'COLLABORATOR' }, status))
      assert.isFalse(isUserRoleAllowedToEditAssessmentComments({ role: 'COLLABORATOR' }, status))
    }, allStatusesButThese(['editing']))
  })
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('National correspondents can only edit editing', () => {
    const nc = { role: 'NATIONAL_CORRESPONDENT' }
    assert.isTrue(isUserRoleAllowedToEditAssessmentData(nc, 'editing'))
    assert.isTrue(isUserRoleAllowedToEditAssessmentComments(nc, 'editing'))
    assert.isFalse(isUserRoleAllowedToEditAssessmentData(nc, 'review'))
    assert.isFalse(isUserRoleAllowedToEditAssessmentComments(nc, 'review'))
    R.forEach((status: any) => {
      assert.isFalse(isUserRoleAllowedToEditAssessmentData(nc, status))
      assert.isFalse(isUserRoleAllowedToEditAssessmentComments(nc, status))
    }, allStatusesButThese(['editing', 'review']))
  })
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('Reviewers can edit anything below to review.', () => {
    const reviewer = { role: 'REVIEWER' }
    R.forEach((status: any) => {
      assert.isTrue(isUserRoleAllowedToEditAssessmentData(reviewer, status))
      assert.isTrue(isUserRoleAllowedToEditAssessmentComments(reviewer, status))
    }, allStatusesButThese(['approval', 'accepted']))
    assert.isFalse(isUserRoleAllowedToEditAssessmentData(reviewer, 'approval'))
    assert.isFalse(isUserRoleAllowedToEditAssessmentComments(reviewer, 'approval'))
    assert.isFalse(isUserRoleAllowedToEditAssessmentData(reviewer, 'accepted'))
    assert.isFalse(isUserRoleAllowedToEditAssessmentComments(reviewer, 'accepted'))
  })
})
