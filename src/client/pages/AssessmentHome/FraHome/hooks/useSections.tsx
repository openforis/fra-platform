import React from 'react'

import { AssessmentHomeRouteNames } from '@meta/app'
import { Users } from '@meta/user'

import { useCycle } from '@client/store/assessment'
import { useUser } from '@client/store/user'
import { useCountryIso } from '@client/hooks'
import Dashboard from '@client/pages/Dashboard'

import Collaborators from '../Collaborators'
import CountryMessageBoard from '../CountryMessageBoard'
import Links from '../Links'
import RecentActivity from '../RecentActivity'

type Section = {
  name: AssessmentHomeRouteNames
  component: React.FC
}

const Placeholder: React.FC = () => {
  return <div>Home section Placeholder</div>
}

export const useSections = (): Array<Section> => {
  const user = useUser()
  const countryIso = useCountryIso()
  const cycle = useCycle()

  const sections: Array<Section> = [{ name: AssessmentHomeRouteNames.overview, component: Dashboard }]

  if (user) {
    sections.push({ name: AssessmentHomeRouteNames.messageBoard, component: CountryMessageBoard })
    sections.push({ name: AssessmentHomeRouteNames.recentActivity, component: RecentActivity })
    sections.push({ name: AssessmentHomeRouteNames.links, component: Links })
  }

  if (Users.getRolesAllowedToEdit({ user, countryIso, cycle }).length > 0) {
    sections.splice(2, 0, { name: AssessmentHomeRouteNames.userManagement, component: Collaborators })
  }

  if (Users.isAdministrator(user) || Users.isReviewer(user, countryIso, cycle)) {
    sections.splice(2, 0, { name: AssessmentHomeRouteNames.contentCheck, component: Placeholder })
  }

  return sections
}
