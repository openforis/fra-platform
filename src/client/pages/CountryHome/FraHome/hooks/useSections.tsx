import React, { useMemo } from 'react'

import { Areas } from 'meta/area'
import { AssessmentNames } from 'meta/assessment'
import { SectionNames } from 'meta/routes'

import { useAssessment, useCycle } from 'client/store/assessment'
import { useCanSeeUserActivities, useUser } from 'client/store/user'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import Collaborators from 'client/pages/CountryHome/Collaborators'
import RecentActivity from 'client/pages/CountryHome/FraHome/RecentActivity'
import Overview from 'client/pages/CountryHome/Overview'
import Repository from 'client/pages/CountryHome/Repository'

type Section = {
  name: string
  component: React.FC
}

export const useSections = (): Array<Section> => {
  const user = useUser()
  const { countryIso } = useCountryRouteParams()
  const assessment = useAssessment()
  const cycle = useCycle()

  const canSeeUserActivities = useCanSeeUserActivities(user)

  return useMemo(() => {
    const sections: Array<Section> = []

    if (!cycle) return null

    const isFra2020 = assessment.props.name === AssessmentNames.fra && cycle.name === '2020'
    const isCountry = Areas.isISOCountry(countryIso)

    const showOverview = isFra2020 || isCountry

    if (showOverview) {
      sections.push({ name: SectionNames.Country.Home.overview, component: Overview })
    }

    if (user && isCountry) {
      sections.push({ name: SectionNames.Country.Home.repository, component: Repository })
    }

    if (canSeeUserActivities && isCountry) {
      sections.splice(2, 0, { name: SectionNames.Country.Home.userManagement, component: Collaborators })
    }

    // Show recent activity as last item
    if (canSeeUserActivities && isCountry) {
      sections.push({ name: SectionNames.Country.Home.recentActivity, component: RecentActivity })
    }

    return sections
  }, [cycle, assessment.props.name, countryIso, user, canSeeUserActivities])
}
