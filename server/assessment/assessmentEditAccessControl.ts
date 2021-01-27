import * as R from 'ramda'
import { roleForCountry, isCollaborator } from '../../common/countryRole'
import { assessmentSections } from '../../common/assessmentSectionItems'
import { AccessControlException } from '../utils/accessControl'
import * as assessmentRepository from './assessmentRepository'
import {
  isUserRoleAllowedToEditAssessmentData,
  isUserRoleAllowedToEditAssessmentComments,
  isCollaboratorAllowedToEditSectionData,
} from '../../common/assessmentRoleAllowance'
import { fetchCollaboratorCountryAccessTables } from '../collaborators/collaboratorsRepository'

export const assessmentForSection = (section: any) =>
  R.pipe(
    R.toPairs,
    // @ts-ignore
    R.map(([assessment, sections]) => (R.contains(section, sections) ? assessment : null)),
    R.head
  )(assessmentSections)

export const getAssessmentStatus = async (countryIso: any, section: any) => {
  const assessments = await assessmentRepository.getAssessments(countryIso)
  const assessment = assessmentForSection(section)
  // @ts-ignore
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

export const allowedToEditDataCheck = async (countryIso: any, user: any, section: any) => {
  const assessmentStatus = await getAssessmentStatus(countryIso, section)
  const role = roleForCountry(countryIso, user)
  if (!user) {
    // @ts-ignore

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
    // @ts-ignore

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
      // @ts-ignore

      throw new AccessControlException('error.access.assessmentEditingNotAllowed', {
        user: user.name,
        role: role.role,
        countryIso,
        assessmentStatus,
      })
  }
}

export const allowedToEditCommentsCheck = async (countryIso: any, user: any, section: any) => {
  const assessmentStatus = await getAssessmentStatus(countryIso, section)
  const role = roleForCountry(countryIso, user)
  if (R.isNil(assessmentStatus)) return // Until we're sure this doesn't break anything
  if (!isUserRoleAllowedToEditAssessmentComments(role, assessmentStatus)) {
    // @ts-ignore

    throw new AccessControlException('error.access.assessmentCommentingNotAllowed', {
      user: user.name,
      role: role.role,
      countryIso,
      assessmentStatus,
    })
  }
}

export default {
  allowedToEditDataCheck,
  allowedToEditCommentsCheck,
}
