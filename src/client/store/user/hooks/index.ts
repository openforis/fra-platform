import { CountryIso } from '@meta/area'
import { Authorizer, CollaboratorEditPropertyType, User, Users } from '@meta/user'

import { useAppSelector } from '@client/store'
import { useAssessmentCountry, useAssessmentSection, useCountries } from '@client/store/assessment'
import { useIsDataLocked } from '@client/store/ui/dataLock'
import { useCountryIso } from '@client/hooks'
import { useIsPrint } from '@client/hooks/useIsPath'

export const useUser = (): User | undefined => useAppSelector((state) => state.user)

export const useUserCountries = (): Array<CountryIso> => {
  const user = useUser()
  const countries = useCountries().map((c) => c.countryIso)
  const isAdministrator = Users.isAdministrator(user)
  if (isAdministrator) return countries
  return user?.roles.map((role) => role.countryIso)
}

export const useCanEditSection = (sectionName?: string, permission?: CollaboratorEditPropertyType) => {
  const user = useUser()
  const section = useAssessmentSection(sectionName)
  const countryIso = useCountryIso()
  const country = useAssessmentCountry()
  const isDataLocked = useIsDataLocked()
  const { print } = useIsPrint()

  return (
    !print &&
    !isDataLocked &&
    Authorizer.canEdit({
      section,
      user,
      countryIso,
      country,
      permission,
    })
  )
}

export const useCanEditSectionTableData = (sectionName?: string) =>
  useCanEditSection(sectionName, CollaboratorEditPropertyType.tableData)

export const useCanEditSectionDescriptions = (sectionName?: string) =>
  useCanEditSection(sectionName, CollaboratorEditPropertyType.descriptions)
