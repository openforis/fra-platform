import React, { useMemo } from 'react'

import { Objects } from 'utils/objects'

import { SectionNames } from 'meta/routes'
import { Users } from 'meta/user'

import { useCycle } from 'client/store/assessment'
import { useDashboardItems } from 'client/store/metadata'
import { useDashboardLoaded } from 'client/store/metadata/hooks/useDashboardLoaded'
import { useUser } from 'client/store/user'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import Collaborators from 'client/pages/CountryHome/FraHome/Collaborators'
import CountryMessageBoard from 'client/pages/CountryHome/FraHome/CountryMessageBoard'
import RecentActivity from 'client/pages/CountryHome/FraHome/RecentActivity'
import Overview from 'client/pages/CountryHome/Overview'
import Repository from 'client/pages/CountryHome/Repository'

type Section = {
  name: string
  component: React.FC
}

export const useSections = (): Array<Section> | null => {
  const user = useUser()
  const { countryIso } = useCountryRouteParams()
  const cycle = useCycle()
  const loaded = useDashboardLoaded()
  const dashboardItems = useDashboardItems()
  const hasDashboardItems = !Objects.isEmpty(dashboardItems)

  return useMemo(() => {
    const sections: Array<Section> = []

    if (!loaded) return null
    if (!cycle) return null

    if (hasDashboardItems) {
      sections.push({ name: SectionNames.Country.Home.overview, component: Overview })
    }

    if (user) {
      sections.push({ name: SectionNames.Country.Home.messageBoard, component: CountryMessageBoard })
      sections.push({ name: SectionNames.Country.Home.recentActivity, component: RecentActivity })
      sections.push({ name: SectionNames.Country.Home.repository, component: Repository })
    }

    if (Users.getRolesAllowedToView({ user, countryIso, cycle }).length > 0) {
      sections.splice(2, 0, { name: SectionNames.Country.Home.userManagement, component: Collaborators })
    }

    return sections
  }, [loaded, cycle, hasDashboardItems, user, countryIso])
}
