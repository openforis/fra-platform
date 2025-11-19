import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Cycles } from 'meta/assessment/cycles'
import { Routes } from 'meta/routes/routes'
import { User } from 'meta/user/user'
import { Users } from 'meta/user/users'

import { useCountryRouteParams } from 'client/hooks/routeParams'
import { useIsAdminRoute } from 'client/hooks/routes'

type Returned = (props: { assessment: Assessment; cycle: Cycle; user: User }) => void

export const useNavigateTo = (): Returned => {
  const navigate = useNavigate()
  // const { countryIso } = useCountryRouteParams()
  const isAdminPage = useIsAdminRoute()
  const { assessmentName: prevAssessmentName, countryIso } = useCountryRouteParams()

  return useCallback<Returned>(
    (props) => {
      const { assessment, cycle, user } = props
      const assessmentName = assessment.props.name
      const cycleName = cycle.name
      const hasRoleInCountry = Users.hasRoleInCountry({ user, cycle, countryIso })
      const isSameAssessment = prevAssessmentName === assessmentName

      let link = Routes.Cycle.generatePath({ assessmentName, cycleName })
      if (isSameAssessment && countryIso && (Cycles.isPublished(cycle) || hasRoleInCountry)) {
        link = Routes.CountryHome.generatePath({ countryIso, assessmentName, cycleName })
      } else if (isAdminPage) link = Routes.Admin.generatePath({ assessmentName, cycleName })

      navigate(link)
    },
    [countryIso, isAdminPage, navigate, prevAssessmentName]
  )
}
