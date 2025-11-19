import { getCycleRoles } from 'meta/user/users/getCycleRoles'
import { getFullName } from 'meta/user/users/getFullName'
import { getI18nRoleLabelKey } from 'meta/user/users/getI18nRoleLabelKey'
import { getRole } from 'meta/user/users/getRole'
import { getRolesAllowedToEdit, getRolesAllowedToView } from 'meta/user/users/getRolesAllowed'
import { hasEditorRole, hasRoleInAssessment, hasRoleInCountry, hasRoleInCycle } from 'meta/user/users/hasRole'
import { isPersonalInfoRequired } from 'meta/user/users/isPersonalInfoRequired'
import {
  isAdministrator,
  isAlternateNationalCorrespondent,
  isAReviewer,
  isCollaborator,
  isNationalCorrespondent,
  isReviewer,
  isViewer,
} from 'meta/user/users/isRole'

export const Users = {
  getCycleRoles,
  getRole,
  getFullName,

  isAdministrator,
  isAlternateNationalCorrespondent,
  isCollaborator,
  isNationalCorrespondent,
  isPersonalInfoRequired,
  isReviewer,
  isAReviewer,
  isViewer,

  getRolesAllowedToEdit,
  getRolesAllowedToView,
  getI18nRoleLabelKey,
  hasEditorRole,
  hasRoleInAssessment,
  hasRoleInCycle,
  hasRoleInCountry,
}
