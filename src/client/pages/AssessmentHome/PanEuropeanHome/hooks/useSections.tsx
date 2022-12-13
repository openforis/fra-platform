import React from 'react'

import { Users } from '@meta/user'

import { useCycle } from '@client/store/assessment'
import { useUser } from '@client/store/user'
import { useCountryIso } from '@client/hooks'
import RecentActivity from '@client/pages/AssessmentHome/FraHome/RecentActivity'

enum SectionNames {
  overview = 'overview',
  userManagement = 'userManagement',
  recentActivity = 'recentActivity',
}

type Section = {
  name: SectionNames
  component: React.FC
}

const Placeholder: React.FC = () => {
  return <div>Home section Placeholder</div>
}

export const useSections = (): Array<Section> => {
  const user = useUser()
  const countryIso = useCountryIso()
  const cycle = useCycle()

  const sections: Array<Section> = [{ name: SectionNames.overview, component: Placeholder }]

  if (user) {
    sections.push({ name: SectionNames.recentActivity, component: RecentActivity })
  }
  if (Users.getRolesAllowedToEdit({ user, countryIso, cycle }).length > 0) {
    sections.splice(2, 0, { name: SectionNames.userManagement, component: Placeholder })
  }

  return sections
}
