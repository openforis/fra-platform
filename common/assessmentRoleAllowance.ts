import * as R from 'ramda'
import { assessmentStatus as status } from './assessment'
import {
  noRole,
  collaborator,
  alternateNationalCorrespondent,
  nationalCorrespondent,
  reviewer,
  administrator,
} from './countryRole'
/**
 * @deprecated
 */

export const roleAllowances: any = {
  [noRole.role]: {
    comments: [],
    data: [],
  },
  [collaborator.role]: {
    comments: [(status as any).editing],
    data: [(status as any).editing],
  },
  [alternateNationalCorrespondent.role]: {
    comments: [(status as any).editing],
    data: [(status as any).editing],
  },
  [nationalCorrespondent.role]: {
    comments: [(status as any).editing],
    data: [(status as any).editing],
  },
  [reviewer.role]: {
    comments: [(status as any).editing, (status as any).review],
    data: [(status as any).editing, (status as any).review],
  },
  [administrator.role]: {
    comments: [(status as any).editing, (status as any).review, (status as any).approval, (status as any).accepted],
    data: [(status as any).editing, (status as any).review, (status as any).approval, (status as any).accepted],
  },
}
/**
 * @deprecated
 */
export const isUserRoleAllowedToEdit = (role: any, assessmentStatus: any, editType: any) => {
  if (R.isNil(role) || R.isNil(role.role)) return false
  const allowedStatusesForRole = R.path([role.role, editType], roleAllowances)
  // @ts-ignore
  return R.includes(assessmentStatus, allowedStatusesForRole)
}
/**
 * @deprecated
 */
export const isUserRoleAllowedToEditAssessmentComments = (role: any, assessmentStatus: any) =>
  isUserRoleAllowedToEdit(role, assessmentStatus, 'comments')
/**
 * @deprecated
 */
export const isUserRoleAllowedToEditAssessmentData = (role: any, assessmentStatus: any) =>
  isUserRoleAllowedToEdit(role, assessmentStatus, 'data')
/**
 * @deprecated
 */
export const isCollaboratorAllowedToEditSectionData = (section: any, allowedTables: any) => {
  const allowedSections = allowedTables.map((t: any) => t.section)
  if (R.includes('all', allowedSections) || R.includes(section, allowedSections)) return true
  return false
}
export default {
  roleAllowances,
  /**
   * @deprecated
   */
  isUserRoleAllowedToEdit,
  /**
   * @deprecated
   */
  isUserRoleAllowedToEditAssessmentComments,
  /**
   * @deprecated
   */
  isUserRoleAllowedToEditAssessmentData,
  /**
   * @deprecated
   */
  isCollaboratorAllowedToEditSectionData,
}
