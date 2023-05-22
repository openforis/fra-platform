import React from 'react'

import { Users } from '@meta/user'

import { useCycle } from '@client/store/assessment'
import { useUser } from '@client/store/user'
import { useCountryIso } from '@client/hooks'
import Collaborators from '@client/pages/AssessmentHome/FraHome/Collaborators'
import CountryMessageBoard from '@client/pages/AssessmentHome/FraHome/CountryMessageBoard'
import RecentActivity from '@client/pages/AssessmentHome/FraHome/RecentActivity'

import Overview from '../Overview'

enum SectionNames {
  overview = 'overview',
  messageBoard = 'messageBoard',
  userManagement = 'userManagement',
  recentActivity = 'recentActivity',
}

type Section = {
  name: SectionNames
  component: React.FC
}

export const useSections = (): Array<Section> => {
  const user = useUser()
  const countryIso = useCountryIso()
  const cycle = useCycle()

  const sections: Array<Section> = [{ name: SectionNames.overview, component: Overview }]

  if (user) {
    sections.push({ name: SectionNames.messageBoard, component: CountryMessageBoard })
    sections.push({ name: SectionNames.recentActivity, component: RecentActivity })
  }
  if (Users.getRolesAllowedToEdit({ user, countryIso, cycle }).length > 0) {
    sections.splice(2, 0, { name: SectionNames.userManagement, component: Collaborators })
  }

  return sections
}
