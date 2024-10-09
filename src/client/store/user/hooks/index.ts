import { useMemo } from 'react'

import { CountryIso } from 'meta/area'
import { Assessments, CommentableDescriptionName, Cycle, Cycles, SectionName } from 'meta/assessment'
import { Authorizer, CollaboratorEditPropertyType, User, Users } from 'meta/user'

import { useAppSelector } from 'client/store'
import { useAssessmentCountry, useCountries, useCountry } from 'client/store/area'
import { useAssessment, useCycle } from 'client/store/assessment'
import { useSection } from 'client/store/metadata'
import { useIsDescriptionEditEnabled } from 'client/store/ui/assessmentSection'
import { useIsDataLocked } from 'client/store/ui/dataLock'
import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

export const useUser = (): User | undefined => useAppSelector((state) => state.user)

export const useUserCountries = (): Array<CountryIso> => {
  const cycle = useCycle()
  const user = useUser()
  const countries = useCountries().map((c) => c.countryIso)
  const isAdministrator = Users.isAdministrator(user)
  if (isAdministrator) return countries
  // Return only current cycle countries for user
  return user?.roles.filter((role) => cycle.uuid === role.cycleUuid).map((role) => role.countryIso)
}

export const useUserCycles = (): Array<Cycle> => {
  const assessment = useAssessment()
  const user = useUser()
  const isAdministrator = Users.isAdministrator(user)
  if (isAdministrator) return assessment.cycles

  // Users who are not logged in can only access the most recently published cycle
  if (!user) return [Assessments.getLastPublishedCycle(assessment)]

  // Return only current assessment cycles for user
  return assessment.cycles.filter(
    (cycle) => Cycles.isPublished(cycle) || user?.roles.some((role) => cycle.uuid === role.cycleUuid)
  )
}

// TODO: move below auth hook under useAuth (future task)
export const useCanEditCycleData = (): boolean => {
  const user = useUser()
  const country = useAssessmentCountry()
  const cycle = useCycle()

  return Authorizer.canEditCycleData({ cycle, country, user })
}

export const useCanEdit = (sectionName: string, permission = CollaboratorEditPropertyType.tableData) => {
  const user = useUser()
  const section = useSection(sectionName)
  const country = useAssessmentCountry()
  const cycle = useCycle()

  return Authorizer.canEditData({ country, cycle, permission, section, user })
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
  const { sectionName, name } = props

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
