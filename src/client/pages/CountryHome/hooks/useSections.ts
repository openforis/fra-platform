import { useMemo } from 'react'

import { AssessmentName, AssessmentNames } from 'meta/assessment/assessment'

import { useCycle } from 'client/store/meta/hooks/cycles'
import { useCanSeeUserActivities } from 'client/store/user/hooks/auth'
import { useUser } from 'client/store/user/hooks/user'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import { getFraSections } from 'client/pages/CountryHome/hooks/getFraSections'
import { getPanEuropeanSections } from 'client/pages/CountryHome/hooks/getPanEuropeanSections'
import { PropsSections } from 'client/pages/CountryHome/hooks/types'
import { CountryHomeSection } from 'client/pages/CountryHome/types'

type Returned = Array<CountryHomeSection>

const Sections: Record<AssessmentName, (props: PropsSections) => Returned> = {
  [AssessmentNames.fra]: getFraSections,
  [AssessmentNames.panEuropean]: getPanEuropeanSections,
}

export const useSections = (): Returned => {
  const { assessmentName, countryIso } = useCountryRouteParams()
  const user = useUser()
  const cycle = useCycle()
  const canSeeUserActivities = useCanSeeUserActivities(user)

  return useMemo<Returned>(() => {
    return Sections[assessmentName]({ canSeeUserActivities, countryIso, cycle, user })
  }, [assessmentName, canSeeUserActivities, countryIso, cycle, user])
}
