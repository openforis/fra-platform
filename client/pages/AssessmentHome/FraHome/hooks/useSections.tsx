import React from 'react'

import { Users } from '@meta/user'

import { useUser } from '@client/store/user'
import { useCountryIso } from '@client/hooks'
import { AssessmentHomeRouteNames } from '@client/basePaths'
import Dashboard from '@client/pages/Dashboard'

import Collaborators from '../Collaborators'

type Section = {
  name: AssessmentHomeRouteNames
  component: React.FC
}

const Placeholder: React.FC = () => {
  return <div>Home section pLaceholder</div>
}

export const useSections = (): Array<Section> => {
  const user = useUser()
  const countryIso = useCountryIso()
  const sections: Array<Section> = [{ name: AssessmentHomeRouteNames.overview, component: Dashboard }]

  if (user) {
    sections.push({ name: AssessmentHomeRouteNames.messageBoard, component: Placeholder })
    sections.push({ name: AssessmentHomeRouteNames.recentActivity, component: Placeholder })
    sections.push({ name: AssessmentHomeRouteNames.links, component: Placeholder })
  }

  if (Users.getRolesAllowedToEdit({ user, countryIso }).length > 0) {
    sections.splice(2, 0, { name: AssessmentHomeRouteNames.userManagement, component: Collaborators })
  }

  if (Users.isAdministrator(user) || Users.isReviewer(user, countryIso)) {
    sections.splice(2, 0, { name: AssessmentHomeRouteNames.contentCheck, component: Placeholder })
  }

  return sections
}
