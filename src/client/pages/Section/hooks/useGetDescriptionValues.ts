import { useEffect } from 'react'

import { CountryIso } from 'meta/area'

import { useAppDispatch } from 'client/store'
import { DataActions } from 'client/store/data'
import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

type Props = { sectionName: string }

export const useGetDescriptionValues = (props: Props): void => {
  const { sectionName } = props

  const dispatch = useAppDispatch()
  const { print } = useIsPrintRoute()
  const { assessmentName, cycleName, countryIso: _countryIso } = useCountryRouteParams()
  const countryIso = _countryIso as CountryIso

  useEffect(() => {
    if (!print) {
      dispatch(DataActions.getDescription({ countryIso, assessmentName, cycleName, sectionName }))
    }
  }, [assessmentName, countryIso, cycleName, dispatch, print, sectionName])
}
