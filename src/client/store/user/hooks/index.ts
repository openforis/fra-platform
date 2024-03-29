import { useMemo } from 'react'

import { CountryIso } from 'meta/area'
import { CommentableDescriptionName, Cycle, SectionName } from 'meta/assessment'
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
  // Return only current assessment cycles for user
  return assessment.cycles.filter(
    (cycle) => cycle.published || user?.roles.some((role) => cycle.uuid === role.cycleUuid)
  )
}

// TODO: move below auth hook under useAuth (future task)
export const useCanEdit = (sectionName: string, permission = CollaboratorEditPropertyType.tableData) => {
  const user = useUser()
  const section = useSection(sectionName)
  const country = useAssessmentCountry()
  const cycle = useCycle()

  return Authorizer.canEditData({ country, cycle, permission, section, user })
}

const useCanEditSection = (sectionName: string, permission: CollaboratorEditPropertyType) => {
  const isDataLocked = useIsDataLocked()
  const { print } = useIsPrintRoute()
  const canEdit = useCanEdit(sectionName, permission)

  return !print && !isDataLocked && canEdit
}

export const useIsEditTableDataEnabled = (sectionName: string) =>
  useCanEditSection(sectionName, CollaboratorEditPropertyType.tableData)

export const useCanEditDescription = (props: { sectionName: SectionName }): boolean =>
  useCanEditSection(props.sectionName, CollaboratorEditPropertyType.descriptions)

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
