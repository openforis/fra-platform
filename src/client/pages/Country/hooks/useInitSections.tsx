import { useEffect } from 'react'

import { Objects } from 'utils/objects'

import { useAppDispatch } from 'client/store/hooks'
import { MetaActions } from 'client/store/meta/actions'
import { useSections } from 'client/store/meta/hooks/sections'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

export const useInitSections = () => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams()
  const dispatch = useAppDispatch()
  const sections = useSections()

  useEffect(() => {
    if (Objects.isEmpty(sections)) {
      dispatch(MetaActions.getSections({ assessmentName, cycleName, countryIso }))
    }
  }, [assessmentName, countryIso, cycleName, dispatch, sections])
}
