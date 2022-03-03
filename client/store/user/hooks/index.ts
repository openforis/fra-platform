import { useCountryIso } from '@client/hooks'
import { CountryIso } from '@meta/area'
import { Authorizer, User, Users } from '@meta/user'
import { useAppSelector } from '@client/store'
import { useAssessmentCountryStatus, useAssessmentSection, useCountries } from '@client/store/assessment'

export const useUser = (): User | undefined => useAppSelector((state) => state.user)

export const useUserCountries = (): Array<CountryIso> => {
  const user = useUser()
  const countries = useCountries()
  const isAdministrator = Users.isAdministrator(user)
  if (isAdministrator) return countries
  return user?.roles.map((role) => role.countryIso)
}

export const useCanEditSection = () => {
  const user = useUser()
  const section = useAssessmentSection()
  const countryIso = useCountryIso()
  const countryStatus = useAssessmentCountryStatus()

  return Authorizer.canEdit({
    section,
    user,
    countryIso,
    countryStatus,
  })
}
