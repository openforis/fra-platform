import { Areas } from 'meta/area/areas'
import { Authorizer } from 'meta/auth/authorizer'
import { SectionNames } from 'meta/routes/sectionNames'
import { Users } from 'meta/user/users'

import Collaborators from 'client/pages/CountryHome/Collaborators'
import FraOverview from 'client/pages/CountryHome/FraOverview'
import { RouteSectionFactory } from 'client/pages/CountryHome/hooks/sectionFactory'
import { PropsSections } from 'client/pages/CountryHome/hooks/types'
import LinksStatus from 'client/pages/CountryHome/LinksStatus'
import RecentActivity from 'client/pages/CountryHome/RecentActivity'
import Repository from 'client/pages/CountryHome/Repository'
import { CountryHomeSection } from 'client/pages/CountryHome/types'

export const getFraSections = (props: PropsSections): Array<CountryHomeSection> => {
  const { canSeeUserActivities, countryIso, cycle, user } = props
  const sections: Array<CountryHomeSection> = []

  const isCountry = Areas.isISOCountry(countryIso)
  const showRegionDashboard = !Areas.isISOCountry(countryIso) && cycle.props.dashboard?.region
  const showOverview = showRegionDashboard || Areas.isISOCountry(countryIso)
  const hasRoleInCountry = user && isCountry && Users.hasRoleInCountry({ countryIso, cycle, user })
  const canVerifyLinks = user && isCountry && Authorizer.canVerifyLinks({ user, countryIso, cycle })

  if (showOverview) {
    sections.push({ component: FraOverview, route: RouteSectionFactory(SectionNames.Country.Home.overview) })
  }

  if (hasRoleInCountry) {
    sections.push({ component: Repository, route: RouteSectionFactory(SectionNames.Country.Home.repository) })
  }

  if (canSeeUserActivities && isCountry) {
    sections.splice(2, 0, {
      component: Collaborators,
      route: RouteSectionFactory(SectionNames.Country.Home.collaborators),
    })
  }

  if (canVerifyLinks) {
    sections.push({ component: LinksStatus, route: RouteSectionFactory(SectionNames.Country.Home.linksStatus) })
  }

  // Show recent activity as last item
  if (canSeeUserActivities && isCountry) {
    sections.push({ component: RecentActivity, route: RouteSectionFactory(SectionNames.Country.Home.recentActivity) })
  }

  return sections
}
