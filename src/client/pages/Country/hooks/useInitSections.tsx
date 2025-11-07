import { useEffect } from 'react'

import { Objects } from 'utils/objects'

import { Global } from 'meta/area/global'

import { useAppDispatch } from 'client/store/hooks'
import { MetaActions } from 'client/store/meta/actions'
import { useSections } from 'client/store/meta/hooks/sections'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import { useIsAdminRoute } from 'client/hooks/routes'

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
