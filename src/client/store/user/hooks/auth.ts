// TODO: move below auth hook under useAuth (future task)
import { useMemo } from 'react'

import { CountryIso } from 'meta/area'
import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'
import { Authorizer, CollaboratorEditPropertyType, User, Users } from 'meta/user'

import { useAssessmentCountry, useCountry } from 'client/store/area/hooks/country'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { useSection } from 'client/store/meta/hooks/sections'
import { useIsDataLocked } from 'client/store/ui/countryReport/hooks/datalock'
import { useIsDescriptionEditEnabled } from 'client/store/ui/countryReport/hooks/descriptions'
import { useUser } from 'client/store/user/hooks/user'
import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

export const useCanEditCycleData = (): boolean => {
  const user = useUser()
  const country = useAssessmentCountry()
  const cycle = useCycle()

  return Authorizer.canEditSomeData({ cycle, country, user })
}

export const useCanEdit = (sectionName: string, permission = CollaboratorEditPropertyType.tableData) => {
  const user = useUser()
  const section = useSection(sectionName)
  const country = useAssessmentCountry()
  const cycle = useCycle()

  return Authorizer.canEditSectionData({ country, cycle, permission, section, user })
}
// edit enabled
const useIsEditSectionEnabled = (sectionName: string, permission: CollaboratorEditPropertyType) => {
  const isDataLocked = useIsDataLocked()
  const { print } = useIsPrintRoute()
  const canEdit = useCanEdit(sectionName, permission)

  return !print && !isDataLocked && canEdit
}
export const useIsEditTableDataEnabled = (sectionName: string) =>
  useIsEditSectionEnabled(sectionName, CollaboratorEditPropertyType.tableData)
export const useCanEditDescription = (props: { sectionName: SectionName }): boolean =>
  useIsEditSectionEnabled(props.sectionName, CollaboratorEditPropertyType.descriptions)
export const useIsDescriptionEditable = (props: {
  sectionName: SectionName
  name: CommentableDescriptionName
}): boolean => {
  const { name, sectionName } = props

  const canEdit = useCanEditDescription({ sectionName })
  const editEnabled = useIsDescriptionEditEnabled({ sectionName, name })

  return useMemo<boolean>(() => canEdit && editEnabled, [canEdit, editEnabled])
}
export const useIsCountryRepositoryEditable = (): boolean => {
  const { countryIso } = useCountryRouteParams<CountryIso>()
  const user = useUser()
  const cycle = useCycle()
  const country = useCountry(countryIso)
  const canEditRepositoryItem = Authorizer.canEditRepositoryItem({ country, cycle, user })
  const locked = useIsDataLocked()
  return !locked && canEditRepositoryItem
}
export const useIsGlobalRepositoryEditable = (): boolean => {
  const user = useUser()
  const isAdmin = Users.isAdministrator(user)
  const isCountryRepositoryEditable = useIsCountryRepositoryEditable()
  return isCountryRepositoryEditable && isAdmin
}
export const useCanViewHistory = (): boolean => {
  const user = useUser()
  const section = useSection()
  const country = useAssessmentCountry()
  const cycle = useCycle()

  return Authorizer.canViewHistory({ country, cycle, section, user })
}
export const useCanViewHistoryLastApproved = (): boolean => {
  const user = useUser()
  const country = useAssessmentCountry()
  const cycle = useCycle()

  return Authorizer.canViewHistoryLastApproved({ country, cycle, user })
}
export const useCanViewGeo = (): boolean => {
  const cycle = useCycle()
  const { countryIso } = useCountryRouteParams()
  const user = useUser()

  return Authorizer.canViewGeo({ cycle, countryIso, user })
}
export const useCanViewReview = (sectionName: string) => {
  const isDataLocked = useIsDataLocked()
  const { print } = useIsPrintRoute()
  const user = useUser()
  const section = useSection(sectionName)
  const country = useAssessmentCountry()
  const cycle = useCycle()

  const canView = Authorizer.canViewReview({ country, cycle, section, user })
  return !print && !isDataLocked && canView
}
/**
 * React hook to determine whether given user has access to edit user activities (eg. Resend or delete invitation)
 *
 * @param user - The user
 * @returns boolean indicating whether the user can edit user activities
 *
 * @example
 * const user = useUser();
 * const canEditActivities = useCanEditUserActivities(user);
 *
 * if (!canEditActivities) {
 *   // Hide activities UI (eg invitation actions)
 * }
 */
export const useCanEditUserActivities = (user: User) => {
  const { countryIso } = useCountryRouteParams()
  const cycle = useCycle()

  const rolesAllowedToEdit = Users.getRolesAllowedToEdit({ user, countryIso, cycle })
  return rolesAllowedToEdit.length > 0
}
/**
 * React hook to determine whether given user has access to view user activities (eg. Messaging, Recent activity, etc.)
 *
 * @param user - The user
 * @returns boolean indicating whether the user can view user activities
 *
 * @example
 * const user = useUser();
 * const canSeeActivities = useCanSeeUserActivities(user);
 *
 * if (!canSeeActivities) {
 *   // Hide activities UI
 * }
 */
export const useCanSeeUserActivities = (user: User) => {
  const { countryIso } = useCountryRouteParams<CountryIso>()
  const cycle = useCycle()

  return Authorizer.canViewUsers({ countryIso, cycle, user })
}
