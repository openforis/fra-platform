import { useEffect } from 'react'

import { Objects } from 'utils/objects'

import { Global } from 'meta/area'

import { useAppDispatch } from 'client/store/hooks'
import { MetaActions } from 'client/store/meta/actions'
import { useSections } from 'client/store/meta/hooks/sections'
import { useIsAdminRoute } from 'client/hooks/routes'
import { useCountryRouteParams } from 'client/hooks/routeParams'

export const useInitSections = (): void => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams()
  const dispatch = useAppDispatch()
  const sections = useSections()
  const isAdmin = useIsAdminRoute()

  useEffect(() => {
    if (Objects.isEmpty(sections)) {
      dispatch(MetaActions.getSections({ assessmentName, cycleName, countryIso: isAdmin ? Global.WO : countryIso }))
    }
  }, [assessmentName, countryIso, cycleName, dispatch, isAdmin, sections])
}
