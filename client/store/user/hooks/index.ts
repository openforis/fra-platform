import { useCountryIso } from '@client/hooks'
import { CountryIso } from '@meta/area'
import { Authorizer, User, Users } from '@meta/user'
import { useAppSelector } from '@client/store'
import { useAssessmentSection, useCountries, useAssessmentCountry } from '@client/store/assessment'
import { useIsDataLocked } from '@client/store/ui/dataLock'

export const useUser = (): User | undefined => useAppSelector((state) => state.user)

export const useUserCountries = (): Array<CountryIso> => {
  const user = useUser()
  const countries = useCountries().map((c) => c.countryIso)
  const isAdministrator = Users.isAdministrator(user)
  if (isAdministrator) return countries
  return user?.roles.map((role) => role.countryIso)
}

export const useCanEditSection = () => {
  const user = useUser()
  const section = useAssessmentSection()
  const countryIso = useCountryIso()
  const country = useAssessmentCountry()
  const isDataLocked = useIsDataLocked()

  return (
    !isDataLocked &&
    Authorizer.canEdit({
      section,
      user,
      countryIso,
      country,
    })
  )
}
