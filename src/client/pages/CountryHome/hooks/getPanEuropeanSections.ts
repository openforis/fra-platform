import { SectionNames } from 'meta/routes/sectionNames'

import Collaborators from 'client/pages/CountryHome/Collaborators'
import { RouteSectionFactory } from 'client/pages/CountryHome/hooks/sectionFactory'
import { PropsSections } from 'client/pages/CountryHome/hooks/types'
import PanEuropeanOverview from 'client/pages/CountryHome/PanEuropeanOverview'
import RecentActivity from 'client/pages/CountryHome/RecentActivity'
import Repository from 'client/pages/CountryHome/Repository'
import { CountryHomeSection } from 'client/pages/CountryHome/types'

export const getPanEuropeanSections = (props: PropsSections): Array<CountryHomeSection> => {
  const { canSeeUserActivities, user } = props

  const sections: Array<CountryHomeSection> = [
    { component: PanEuropeanOverview, route: RouteSectionFactory(SectionNames.Country.Home.overview) },
  ]

  if (user) {
    sections.push({ component: Repository, route: RouteSectionFactory(SectionNames.Country.Home.repository) })
  }
  if (canSeeUserActivities) {
    sections.splice(2, 0, {
      component: Collaborators,
      route: RouteSectionFactory(SectionNames.Country.Home.collaborators),
    })
  }

  if (canSeeUserActivities) {
    sections.push({ component: RecentActivity, route: RouteSectionFactory(SectionNames.Country.Home.recentActivity) })
  }

  return sections
}
