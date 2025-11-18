import { SectionNames } from 'meta/routes/sectionNames'

import { useCanSeeUserActivities } from 'client/store/user/hooks/auth'
import { useUser } from 'client/store/user/hooks/user'
import Collaborators from 'client/pages/CountryHome/Collaborators'
import RecentActivity from 'client/pages/CountryHome/FraHome/RecentActivity'
import Repository from 'client/pages/CountryHome/Repository'
import { CountryHomeSection } from 'client/pages/CountryHome/types'

import Overview from '../Overview'

export const useSections = (): Array<CountryHomeSection> => {
  const user = useUser()
  const canSeeUserActivities = useCanSeeUserActivities(user)

  const sections: Array<CountryHomeSection> = [{ name: SectionNames.Country.Home.overview, component: Overview }]

  if (user) {
    sections.push({ name: SectionNames.Country.Home.repository, component: Repository })
  }
  if (canSeeUserActivities) {
    sections.splice(2, 0, { name: SectionNames.Country.Home.collaborators, component: Collaborators })
  }

  if (canSeeUserActivities) {
    sections.push({ name: SectionNames.Country.Home.recentActivity, component: RecentActivity })
  }

  return sections
}
