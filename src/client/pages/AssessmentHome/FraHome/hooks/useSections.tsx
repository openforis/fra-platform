import React from 'react'

import { Users } from 'meta/user'

import { useCycle } from 'client/store/assessment'
import { useUser } from 'client/store/user'
import { useCountryIso } from 'client/hooks'
import Dashboard from 'client/pages/Dashboard'

import Collaborators from '../Collaborators'
import CountryMessageBoard from '../CountryMessageBoard'
import Links from '../Links'
import RecentActivity from '../RecentActivity'

enum SectionNames {
  overview = 'overview',
  messageBoard = 'messageBoard',
  // contentCheck = 'contentCheck',
  userManagement = 'userManagement',
  recentActivity = 'recentActivity',
  links = 'links',
}

type Section = {
  name: SectionNames
  component: React.FC
}

export const useSections = (): Array<Section> => {
  const user = useUser()
  const countryIso = useCountryIso()
  const cycle = useCycle()

  const sections: Array<Section> = []

  // TODO: Remove this when dashboard updated for 2025
  if (cycle.name === '2020') {
    sections.push({ name: SectionNames.overview, component: Dashboard })
  }

  if (user) {
    sections.push({ name: SectionNames.messageBoard, component: CountryMessageBoard })
    sections.push({ name: SectionNames.recentActivity, component: RecentActivity })
    sections.push({ name: SectionNames.links, component: Links })
  }

  if (Users.getRolesAllowedToEdit({ user, countryIso, cycle }).length > 0) {
    sections.splice(2, 0, { name: SectionNames.userManagement, component: Collaborators })
  }

  // if (Users.isAdministrator(user) || Users.isReviewer(user, countryIso, cycle)) {
  //   sections.splice(2, 0, { name: SectionNames.contentCheck, component: Placeholder })
  // }

  return sections
}
