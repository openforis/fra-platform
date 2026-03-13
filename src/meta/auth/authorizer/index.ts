import { canDisableUser } from 'meta/auth/authorizer/canDisableUser'
import { canEditCountryProps } from 'meta/auth/authorizer/canEditCountryProps'
import { canEditRepositoryItem } from 'meta/auth/authorizer/canEditRepositoryItem'
import { canEditSectionData } from 'meta/auth/authorizer/canEditSectionData'
import { canEditSomeData } from 'meta/auth/authorizer/canEditSomeData'
import { canEditUser, canEditUserRoleName } from 'meta/auth/authorizer/canEditUser'
import { canEditUserRolePermissions } from 'meta/auth/authorizer/canEditUserRolePermissions'
import { canEditUserRoleProps } from 'meta/auth/authorizer/canEditUserRoleProps'
import { canExportUsers } from 'meta/auth/authorizer/canExportUsers'
import { canVerifyLinks } from 'meta/auth/authorizer/canVerifyLinks'
import { canView } from 'meta/auth/authorizer/canView'
import { canViewGeo } from 'meta/auth/authorizer/canViewGeo'
import { canViewHistory } from 'meta/auth/authorizer/canViewHistory'
import { canViewHistoryLastApproved } from 'meta/auth/authorizer/canViewHistoryLastApproved'
import { canViewRepositoryItem } from 'meta/auth/authorizer/canViewRepositoryItem'
import { canViewReview } from 'meta/auth/authorizer/canViewReview'
import { canViewUsers } from 'meta/auth/authorizer/canViewUsers'

export const Authorizer = {
  // ==== country
  // edit
  canEditCountryProps,

  // ==== data
  // edit
  canEditSectionData,
  canEditSomeData,
  // view
  canView,
  // links
  canVerifyLinks,

  // ==== geo
  // view
  canViewGeo,

  // ==== history
  // view
  canViewHistory,
  canViewHistoryLastApproved,

  // ==== repository
  // edit
  canEditRepositoryItem,
  // view
  canViewRepositoryItem,

  // ==== review
  // view
  canViewReview,

  // ==== user
  // edit
  canDisableUser,
  canEditUser,
  canEditUserRoleName,
  canEditUserRolePermissions,
  canEditUserRoleProps,
  // export
  canExportUsers,
  // view
  canViewUsers,
}
