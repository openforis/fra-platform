import { Areas } from 'meta/area/areas'
import { Authorizer } from 'meta/auth/authorizer'
import { SectionNames } from 'meta/routes/sectionNames'

import Collaborators from 'client/pages/CountryHome/Collaborators'
import { RouteSectionFactory } from 'client/pages/CountryHome/hooks/sectionFactory'
import { PropsSections } from 'client/pages/CountryHome/hooks/types'
import LinksStatus from 'client/pages/CountryHome/LinksStatus'
import PanEuropeanOverview from 'client/pages/CountryHome/PanEuropeanOverview'
import RecentActivity from 'client/pages/CountryHome/RecentActivity'
import Repository from 'client/pages/CountryHome/Repository'
import { CountryHomeSection } from 'client/pages/CountryHome/types'

export const getPanEuropeanSections = (props: PropsSections): Array<CountryHomeSection> => {
  const { canSeeUserActivities, countryIso, cycle, user } = props
  const isCountry = Areas.isISOCountry(countryIso)

  const sections: Array<CountryHomeSection> = [
    { component: PanEuropeanOverview, route: RouteSectionFactory(SectionNames.Country.Home.overview) },
  ]

  if (user) {
    sections.push({ component: Repository, route: RouteSectionFactory(SectionNames.Country.Home.repository) })
  }

  const canVerifyLinks = user && isCountry && Authorizer.canVerifyLinks({ user, countryIso, cycle })

  if (canSeeUserActivities) {
    sections.splice(2, 0, {
      component: Collaborators,
      route: RouteSectionFactory(SectionNames.Country.Home.collaborators),
    })
  }

  if (canVerifyLinks) {
    sections.push({ component: LinksStatus, route: RouteSectionFactory(SectionNames.Country.Home.linksStatus) })
  }

  if (canSeeUserActivities) {
    sections.push({ component: RecentActivity, route: RouteSectionFactory(SectionNames.Country.Home.recentActivity) })
  }

  return sections
}
