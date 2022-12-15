import { CountryIso } from '@meta/area'
import { Authorizer, CollaboratorEditPropertyType, User, Users } from '@meta/user'

import { useAppSelector } from '@client/store'
import { useAssessmentCountry, useAssessmentSection, useCountries, useCycle } from '@client/store/assessment'
import { useIsDataLocked } from '@client/store/ui/dataLock'
import { useCountryIso } from '@client/hooks'
import { useIsPrint } from '@client/hooks/useIsPath'

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

const useCanEditSection = (sectionName?: string, permission?: CollaboratorEditPropertyType) => {
  const user = useUser()
  const section = useAssessmentSection(sectionName)
  const countryIso = useCountryIso()
  const country = useAssessmentCountry()
  const isDataLocked = useIsDataLocked()
  const cycle = useCycle()
  const { print } = useIsPrint()

  return (
    !print &&
    !isDataLocked &&
    Authorizer.canEditSections({
      section,
      user,
      countryIso,
      country,
      permission,
      cycle,
    })
  )
}

export const useCanEditTableData = (sectionName?: string) =>
  useCanEditSection(sectionName, CollaboratorEditPropertyType.tableData)

export const useCanEditDescriptions = (sectionName?: string) =>
  useCanEditSection(sectionName, CollaboratorEditPropertyType.descriptions)
