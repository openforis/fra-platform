import { useEffect } from 'react'

import { CountryIso } from 'meta/area'

import { useAppDispatch } from 'client/store'
import { DataActions, useHistoryLastApprovedIsActive } from 'client/store/data'
import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

type Props = { sectionName: string }

export const useGetDescriptionValues = (props: Props): void => {
  const { sectionName } = props

  const dispatch = useAppDispatch()
  const { print } = useIsPrintRoute()
  const { assessmentName, cycleName, countryIso: _countryIso } = useCountryRouteParams()
  const countryIso = _countryIso as CountryIso
  const historyLastApprovedIsActive = useHistoryLastApprovedIsActive()

  useEffect(() => {
    if (!print) {
      dispatch(DataActions.getDescription({ countryIso, assessmentName, cycleName, sectionName }))
    }
    if (!print && historyLastApprovedIsActive) {
      dispatch(DataActions.getDescriptionsHistory({ countryIso, assessmentName, cycleName, sectionName }))
    }
  }, [assessmentName, countryIso, cycleName, dispatch, historyLastApprovedIsActive, print, sectionName])
}
