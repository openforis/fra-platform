import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { ClientRoutes } from 'meta/app'
import { AssessmentName, CycleName } from 'meta/assessment'

import { useCountryIso, useIsAdmin } from 'client/hooks'

export const useNavigateTo = () => {
  const navigate = useNavigate()
  // const { countryIso } = useCountryRouteParams()
  const isAdminPage = useIsAdmin()
  const countryIso = useCountryIso()

  return useCallback(
    (assessmentName: AssessmentName, cycleName: CycleName) => {
      let link = ''
      if (countryIso)
        link = ClientRoutes.Assessment.Cycle.Country.Landing.getLink({ countryIso, assessmentName, cycleName })
      else if (isAdminPage) link = ClientRoutes.Assessment.Cycle.Admin.Root.getLink({ assessmentName, cycleName })
      else link = ClientRoutes.Assessment.Cycle.Landing.getLink({ assessmentName, cycleName })

      navigate(link)
    },
    [countryIso, isAdminPage, navigate]
  )
}
