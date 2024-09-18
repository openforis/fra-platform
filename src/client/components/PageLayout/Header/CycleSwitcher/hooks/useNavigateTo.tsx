import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { Assessment, Cycle, Cycles } from 'meta/assessment'
import { Routes } from 'meta/routes'
import { User, Users } from 'meta/user'

import { useIsAdminRoute } from 'client/hooks'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

export const useNavigateTo = () => {
  const navigate = useNavigate()
  // const { countryIso } = useCountryRouteParams()
  const isAdminPage = useIsAdminRoute()
  const { countryIso } = useCountryRouteParams()

  return useCallback(
    (props: { assessment: Assessment; cycle: Cycle; user: User }) => {
      const { assessment, cycle, user } = props
      const assessmentName = assessment.props.name
      const cycleName = cycle.name
      const hasRoleInCountry = Users.hasRoleInCountry({ user, cycle, countryIso })

      let link = ''
      if (countryIso && (Cycles.isPublished(cycle) || hasRoleInCountry))
        link = Routes.CountryHome.generatePath({ countryIso, assessmentName, cycleName })
      else if (isAdminPage) link = Routes.Admin.generatePath({ assessmentName, cycleName })
      else link = Routes.Cycle.generatePath({ assessmentName, cycleName })

      navigate(link)
    },
    [countryIso, isAdminPage, navigate]
  )
}
