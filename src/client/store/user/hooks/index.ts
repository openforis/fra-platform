import { CountryIso } from 'meta/area'
import { Cycle } from 'meta/assessment'
import { Authorizer, CollaboratorEditPropertyType, User, Users } from 'meta/user'

import { useAppSelector } from 'client/store'
import { useAssessment, useAssessmentCountry, useAssessmentSection, useCountries, useCycle } from 'client/store/assessment'
import { useIsDataLocked } from 'client/store/ui/dataLock'
import { useIsPrint } from 'client/hooks/useIsPath'

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
  return assessment.cycles.filter((cycle) => cycle.published || user?.roles.some((role) => cycle.uuid === role.cycleUuid))
}

export const useCanEdit = (sectionName: string, permission = CollaboratorEditPropertyType.tableData) => {
  const user = useUser()
  const section = useAssessmentSection(sectionName)
  const country = useAssessmentCountry()
  const cycle = useCycle()

  return Authorizer.canEditData({
    country,
    cycle,
    permission,
    section,
    user,
  })
}

const useCanEditSection = (sectionName: string, permission: CollaboratorEditPropertyType) => {
  const isDataLocked = useIsDataLocked()
  const { print } = useIsPrint()
  const canEdit = useCanEdit(sectionName, permission)

  return !print && !isDataLocked && canEdit
}

export const useIsEditTableDataEnabled = (sectionName: string) => useCanEditSection(sectionName, CollaboratorEditPropertyType.tableData)

export const useIsEditDescriptionsEnabled = (sectionName: string) =>
  useCanEditSection(sectionName, CollaboratorEditPropertyType.descriptions)
