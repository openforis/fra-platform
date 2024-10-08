import { getUserRoles } from './getUserRoles'
import {
  getFullName,
  getI18nRoleLabelKey,
  getRole,
  getRolesAllowedToEdit,
  getRolesAllowedToView,
  hasEditorRole,
  hasRoleInAssessment,
  hasRoleInCountry,
  hasRoleInCycle,
  isAdministrator,
  isAlternateNationalCorrespondent,
  isAReviewer,
  isCollaborator,
  isNationalCorrespondent,
  isPersonalInfoRequired,
  isReviewer,
  isViewer,
  profilePictureUri,
  validate,
  validateFields,
  validEmail,
  validEmailField,
  validName,
  validProfilePicture,
  validRole,
} from './users'

export const Users = {
  getFullName,
  getRole,
  getUserRoles,

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

  profilePictureUri,
  validProfilePicture,

  // TODO: Move to UserValidator
  validName,
  validRole,
  validEmail,
  validateFields,
  validate,
  validEmailField,
}
