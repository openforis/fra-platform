import { useMemo } from 'react'

import { Areas } from 'meta/area/areas'
import { SectionNames } from 'meta/routes/sectionNames'
import { Users } from 'meta/user/users'

import { useCycle } from 'client/store/meta/hooks/cycles'
import { useCanSeeUserActivities } from 'client/store/user/hooks/auth'
import { useUser } from 'client/store/user/hooks/user'
import { useCountryRouteParams } from 'client/hooks/routeParams'
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
    const showRegionDashboard = !Areas.isISOCountry(countryIso) && cycle.props.dashboard?.region
    const showOverview = showRegionDashboard || Areas.isISOCountry(countryIso)
    const hasRoleInCountry = user && isCountry && Users.hasRoleInCountry({ countryIso, cycle, user })

    if (showOverview) {
      sections.push({ name: SectionNames.Country.Home.overview, component: Overview })
    }

    if (hasRoleInCountry) {
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
  }, [canSeeUserActivities, countryIso, cycle, user])
}
