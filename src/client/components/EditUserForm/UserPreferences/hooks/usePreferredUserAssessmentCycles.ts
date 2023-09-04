import { useMemo } from 'react'

import { Country } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { Users } from 'meta/user'

import { useCountries } from 'client/store/area'
import { useAssessments } from 'client/store/assessment'
import { useUser } from 'client/store/user'

export const usePreferredUserAssessmentCycles = () => {
  const user = useUser()

  const assessments = useAssessments()
  const countries = useCountries()
  const isAdministrator = Users.isAdministrator(user)

  return useMemo(
    () =>
      assessments.reduce<
        Array<{
          assessment: Assessment
          cycle: Cycle
          countries: Array<Country>
        }>
      >((acc, assessment) => {
        const hasRoleInAssessment = Users.hasRoleInAssessment({ user, assessment })
        if (!hasRoleInAssessment) return acc
        assessment.cycles.forEach((cycle) => {
          const hasRoleInCycle = Users.hasRoleInCycle({ user, cycle })
          if (!hasRoleInCycle) return

          const userCycleCountries = isAdministrator
            ? countries
            : countries.filter((country) => {
                return Users.hasRoleInCountry({ user, countryIso: country.countryIso, cycle })
              })

          acc.push({ assessment, cycle, countries: userCycleCountries })
        })
        return acc
      }, []),
    [assessments, countries, isAdministrator, user]
  )
}
