import { useMemo } from 'react'

import { Areas } from 'meta/area'
import { Cycles } from 'meta/assessment'
import { SectionNames } from 'meta/routes'

import { useCycle } from 'client/store/assessment'
import { useCanSeeUserActivities, useUser } from 'client/store/user'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import Collaborators from 'client/pages/CountryHome/Collaborators'
import RecentActivity from 'client/pages/CountryHome/FraHome/RecentActivity'
import Overview from 'client/pages/CountryHome/Overview'
import Repository from 'client/pages/CountryHome/Repository'
import { CountryHomeSection } from 'client/pages/CountryHome/types'

export const useSections = (): Array<CountryHomeSection> => {
  const user = useUser()
  const { countryIso } = useCountryRouteParams()
  const cycle = useCycle()

  const canSeeUserActivities = useCanSeeUserActivities(user)

  return useMemo(() => {
    const sections: Array<CountryHomeSection> = []

    if (!cycle) return null
    const isCountry = Areas.isISOCountry(countryIso)
    const showOverview = Cycles.isPublished(cycle) || Areas.isISOCountry(countryIso)

    if (showOverview) {
      sections.push({ name: SectionNames.Country.Home.overview, component: Overview })
    }

    if (user && isCountry) {
      sections.push({ name: SectionNames.Country.Home.repository, component: Repository })
    }

    if (canSeeUserActivities && isCountry) {
      sections.splice(2, 0, { name: SectionNames.Country.Home.collaborators, component: Collaborators })
    }

    // Show recent activity as last item
    if (canSeeUserActivities && isCountry) {
      sections.push({ name: SectionNames.Country.Home.recentActivity, component: RecentActivity })
    }

    return sections
  }, [cycle, countryIso, user, canSeeUserActivities])
}
