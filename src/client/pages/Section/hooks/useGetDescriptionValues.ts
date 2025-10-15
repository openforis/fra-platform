import { useEffect } from 'react'

import { CountryIso } from 'meta/area'

import { DescriptionsActions } from 'client/store/data/descriptions/actions'
import { useAppDispatch } from 'client/store/hooks'
import { useIsPrintRoute } from 'client/hooks/routes'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

type Props = { sectionName: string }

export const useGetDescriptionValues = (props: Props): void => {
  const { sectionName } = props

  const dispatch = useAppDispatch()
  const { print } = useIsPrintRoute()
  const { assessmentName, countryIso: _countryIso, cycleName } = useCountryRouteParams()
  const countryIso = _countryIso as CountryIso

  useEffect(() => {
    if (!print) {
      dispatch(DescriptionsActions.getDescription({ countryIso, assessmentName, cycleName, sectionName }))
    }
  }, [assessmentName, countryIso, cycleName, dispatch, print, sectionName])
}
