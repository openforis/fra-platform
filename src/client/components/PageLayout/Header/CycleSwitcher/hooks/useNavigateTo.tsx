import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { ClientRoutes } from 'meta/app'
import { Assessment, Cycle } from 'meta/assessment'
import { User, Users } from 'meta/user'

import { useCountryIso, useIsAdmin } from 'client/hooks'

export const useNavigateTo = () => {
  const navigate = useNavigate()
  // const { countryIso } = useCountryRouteParams()
  const isAdminPage = useIsAdmin()
  const countryIso = useCountryIso()

  return useCallback(
    (props: { assessment: Assessment; cycle: Cycle; user: User }) => {
      const { assessment, cycle, user } = props
      const assessmentName = assessment.props.name
      const cycleName = cycle.name
      const hasRoleInCountry = Users.hasRoleInCountry({ user, cycle, countryIso })

      let link = ''
      if (countryIso && (cycle.published || hasRoleInCountry))
        link = ClientRoutes.Assessment.Cycle.Country.Landing.getLink({ countryIso, assessmentName, cycleName })
      else if (isAdminPage) link = ClientRoutes.Assessment.Cycle.Admin.Root.getLink({ assessmentName, cycleName })
      else link = ClientRoutes.Assessment.Cycle.Landing.getLink({ assessmentName, cycleName })

      navigate(link, { replace: true })
    },
    [countryIso, isAdminPage, navigate]
  )
}
