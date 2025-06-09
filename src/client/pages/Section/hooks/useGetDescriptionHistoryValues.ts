import { useEffect } from 'react'

import { CountryIso } from 'meta/area'

import { HistoryActions } from 'client/store/data/history/actions'
import { useHistoryLastApprovedIsActive } from 'client/store/data/history/hooks/lastApproved'
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
      dispatch(HistoryActions.getDescriptionsHistory({ countryIso, assessmentName, cycleName, sectionName }))
    }
  }, [assessmentName, countryIso, cycleName, dispatch, historyLastApprovedIsActive, print, sectionName])
}
