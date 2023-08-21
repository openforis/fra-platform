import React from 'react'

import { SectionNames } from 'meta/routes'
import { Users } from 'meta/user'

import { useCycle } from 'client/store/assessment'
import { useUser } from 'client/store/user'
import { useCountryIso } from 'client/hooks'
import Collaborators from 'client/pages/CountryHome/FraHome/Collaborators'
import CountryMessageBoard from 'client/pages/CountryHome/FraHome/CountryMessageBoard'
import RecentActivity from 'client/pages/CountryHome/FraHome/RecentActivity'

import Overview from '../Overview'

type Section = {
  name: string
  component: React.FC
}

export const useSections = (): Array<Section> => {
  const user = useUser()
  const countryIso = useCountryIso()
  const cycle = useCycle()

  const sections: Array<Section> = [{ name: SectionNames.Country.Home.overview, component: Overview }]

  if (user) {
    sections.push({ name: SectionNames.Country.Home.messageBoard, component: CountryMessageBoard })
    sections.push({ name: SectionNames.Country.Home.recentActivity, component: RecentActivity })
  }
  if (Users.getRolesAllowedToEdit({ user, countryIso, cycle }).length > 0) {
    sections.splice(2, 0, { name: SectionNames.Country.Home.userManagement, component: Collaborators })
  }

  return sections
}
