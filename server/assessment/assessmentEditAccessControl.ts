// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'roleForCou... Remove this comment to see the full error message
const { roleForCountry, isCollaborator } = require('../../common/countryRole')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'assessment... Remove this comment to see the full error message
const { assessmentSections } = require('../../common/assessmentSectionItems')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'AccessCont... Remove this comment to see the full error message
const { AccessControlException } = require('../utils/accessControl')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'assessment... Remove this comment to see the full error message
const assessmentRepository = require('./assessmentRepository')
const {
  // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'isUserRole... Remove this comment to see the full error message
  isUserRoleAllowedToEditAssessmentData,
  // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'isUserRole... Remove this comment to see the full error message
  isUserRoleAllowedToEditAssessmentComments,
  // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'isCollabor... Remove this comment to see the full error message
  isCollaboratorAllowedToEditSectionData,
} = require('../../common/assessmentRoleAllowance')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'fetchColla... Remove this comment to see the full error message
const { fetchCollaboratorCountryAccessTables } = require('../collaborators/collaboratorsRepository')

const assessmentForSection = (section: any) =>
  R.pipe(
    R.toPairs,
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'assessment' implicitly has an 'an... Remove this comment to see the full error message
    R.map(([assessment, sections]) => (R.contains(section, sections) ? assessment : null)),
    R.head
  )(assessmentSections)

const getAssessmentStatus = async (countryIso: any, section: any) => {
  const assessments = await assessmentRepository.getAssessments(countryIso)
  const assessment = assessmentForSection(section)
  const assessmentStatus = R.path([assessment, 'status'], assessments)
  if (R.isNil(assessment) || R.isNil(assessmentStatus)) {
    // Let's not crash with error in this case yet, we don't know if all the
    // sections coming in are definitely mapped correctly
    console.log(
      'Assessment edit check could not find an assessment status for section',
      section,
      'country was',
      countryIso
    )
    return null
  }
  return assessmentStatus
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'allowedToE... Remove this comment to see the full error message
const allowedToEditDataCheck = async (countryIso: any, user: any, section: any) => {
  const assessmentStatus = await getAssessmentStatus(countryIso, section)
  const role = roleForCountry(countryIso, user)
  if (!user) {
    throw new AccessControlException('error.access.assessmentEditingNotAllowed', {
      user: 'NO_USER',
      role: 'NO_ROLE',
      countryIso,
      assessmentStatus,
    })
  }
  if (R.isNil(assessmentStatus)) return // Until we're sure this doesn't break anything // are we sure yet?

  // first check access for all users
  if (!isUserRoleAllowedToEditAssessmentData(role, assessmentStatus)) {
    throw new AccessControlException('error.access.assessmentEditingNotAllowed', {
      user: user.name,
      role: role.role,
      countryIso,
      assessmentStatus,
    })
  }

  // then check if user is a collaborator and has restricted access to specific table
  if (isCollaborator(countryIso, user)) {
    const tables = await fetchCollaboratorCountryAccessTables(countryIso, user.id)

    if (!isCollaboratorAllowedToEditSectionData(section, tables))
      throw new AccessControlException('error.access.assessmentEditingNotAllowed', {
        user: user.name,
        role: role.role,
        countryIso,
        assessmentStatus,
      })
  }
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'allowedToE... Remove this comment to see the full error message
const allowedToEditCommentsCheck = async (countryIso: any, user: any, section: any) => {
  const assessmentStatus = await getAssessmentStatus(countryIso, section)
  const role = roleForCountry(countryIso, user)
  if (R.isNil(assessmentStatus)) return // Until we're sure this doesn't break anything
  if (!isUserRoleAllowedToEditAssessmentComments(role, assessmentStatus)) {
    throw new AccessControlException('error.access.assessmentCommentingNotAllowed', {
      user: user.name,
      role: role.role,
      countryIso,
      assessmentStatus,
    })
  }
}

module.exports = {
  allowedToEditDataCheck,
  allowedToEditCommentsCheck,
}
