import { useEffect } from 'react'

import { CountryIso } from 'meta/area'

import { DataActions, useHistoryLastApprovedIsActive } from 'client/store/data'
import { useAppDispatch } from 'client/store/hooks'
import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

type Props = { sectionName: string }

export const useGetDescriptionHistoryValues = (props: Props): void => {
  const { sectionName } = props

  const dispatch = useAppDispatch()
  const { print } = useIsPrintRoute()
  const { assessmentName, countryIso: _countryIso, cycleName } = useCountryRouteParams()
  const countryIso = _countryIso as CountryIso
  const historyLastApprovedIsActive = useHistoryLastApprovedIsActive()

  useEffect(() => {
    if (!print && historyLastApprovedIsActive) {
      dispatch(DataActions.getDescriptionsHistory({ countryIso, assessmentName, cycleName, sectionName }))
    }
  }, [assessmentName, countryIso, cycleName, dispatch, historyLastApprovedIsActive, print, sectionName])
}
