const R = require('ramda')
const assert = require('chai').assert
const {roles} = require('../../common/countryRole')
const {assessmentStatus} = require('../../common/assessment')
const {
  isUserRoleAllowedToEditAssessmentData,
  isUserRoleAllowedToEditAssessmentComments
} = require('../../common/assessmentRoleAllowance')

const allStatuses = R.reject(status => status === 'changing' ,R.values(assessmentStatus))
const allStatusesButThese = butThese => R.reject(status => R.contains(status, butThese) ,allStatuses)

describe('assessmentEdit', () => {
  it('Nonexisting roles are not allowed to do anything', () => {
    R.forEach(status => {
      assert.isFalse(isUserRoleAllowedToEditAssessmentData({role: 'NONE'}, status))
      assert.isFalse(isUserRoleAllowedToEditAssessmentComments({role: 'NONE'}, status))
      assert.isFalse(isUserRoleAllowedToEditAssessmentData(null, status))
      assert.isFalse(isUserRoleAllowedToEditAssessmentComments(null, status))
    }, allStatuses)
  })
  it('Admins can do anything', () => {
    R.forEach(status => {
      assert.isTrue(isUserRoleAllowedToEditAssessmentData({role: 'ADMINISTRATOR'}, status), `Admin should be allowed to edit ${status} data`)
      assert.isTrue(isUserRoleAllowedToEditAssessmentComments({role: 'ADMINISTRATOR'}, status), `Admin should be allowed to edit ${status} comments`)
    }, allStatuses)
  })
  it('Collaborators can only edit editing', () => {
    assert.isTrue(isUserRoleAllowedToEditAssessmentData({role: 'COLLABORATOR'}, 'editing'))
    assert.isTrue(isUserRoleAllowedToEditAssessmentComments({role: 'COLLABORATOR'}, 'editing'))
    R.forEach(status => {
        assert.isFalse(isUserRoleAllowedToEditAssessmentData({role: 'COLLABORATOR'}, status))
        assert.isFalse(isUserRoleAllowedToEditAssessmentComments({role: 'COLLABORATOR'}, status))
      },
      allStatusesButThese(['editing']))
  })
  it('National correspondents can only edit editing', () => {
    const nc = {role: 'NATIONAL_CORRESPONDENT'}
    assert.isTrue(isUserRoleAllowedToEditAssessmentData(nc, 'editing'))
    assert.isTrue(isUserRoleAllowedToEditAssessmentComments(nc, 'editing'))
    assert.isFalse(isUserRoleAllowedToEditAssessmentData(nc, 'review'))
    assert.isFalse(isUserRoleAllowedToEditAssessmentComments(nc, 'review'))
    R.forEach(status => {
        assert.isFalse(isUserRoleAllowedToEditAssessmentData(nc, status))
        assert.isFalse(isUserRoleAllowedToEditAssessmentComments(nc, status))
      },
      allStatusesButThese(['editing', 'review']))
  })
  it('Reviewers can edit anything below to review.', () => {
    const reviewer = {role: 'REVIEWER'}
    R.forEach(status => {
        assert.isTrue(isUserRoleAllowedToEditAssessmentData(reviewer, status))
        assert.isTrue(isUserRoleAllowedToEditAssessmentComments(reviewer, status))
      },
      allStatusesButThese(['approval', 'accepted']))
    assert.isFalse(isUserRoleAllowedToEditAssessmentData(reviewer, 'approval'))
    assert.isFalse(isUserRoleAllowedToEditAssessmentComments(reviewer, 'approval'))
    assert.isFalse(isUserRoleAllowedToEditAssessmentData(reviewer, 'accepted'))
    assert.isFalse(isUserRoleAllowedToEditAssessmentComments(reviewer, 'accepted'))
  })
})
