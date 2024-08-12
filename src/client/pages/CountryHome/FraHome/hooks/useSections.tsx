import React, { useMemo } from 'react'

import { Areas } from 'meta/area'
import { SectionNames } from 'meta/routes'
import { Users } from 'meta/user'

import { useCycle } from 'client/store/assessment'
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

export const useSections = (): Array<Section> => {
  const user = useUser()
  const { countryIso } = useCountryRouteParams()
  const cycle = useCycle()

  return useMemo(() => {
    const sections: Array<Section> = []

    if (!cycle) return null

    const showOverview = cycle.published || Areas.isISOCountry(countryIso)

    if (showOverview) {
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

    // if (Users.isAdministrator(user) || Users.isReviewer(user, countryIso, cycle)) {
    //   sections.splice(2, 0, { name: SectionNames.contentCheck, component: Placeholder })
    // }

    return sections
  }, [cycle, user, countryIso])
}
