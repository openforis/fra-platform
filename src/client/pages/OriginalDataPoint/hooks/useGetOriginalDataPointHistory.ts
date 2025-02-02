import { useEffect } from 'react'

import { CountryIso } from 'meta/area'

import { useAppDispatch } from 'client/store'
import { useHistoryLastApprovedIsActive } from 'client/store/data'
import { useSection } from 'client/store/metadata'
import { OriginalDataPointActions } from 'client/store/ui/originalDataPoint'
import { useOriginalDataPointRouteParams } from 'client/hooks/useRouteParams'

export const useGetOriginalDataPointHistory = () => {
  const { assessmentName, countryIso, cycleName, year } = useOriginalDataPointRouteParams()

  const dispatch = useAppDispatch()
  const section = useSection()
  const sectionName = section?.props.name

  const historyLastApprovedIsActive = useHistoryLastApprovedIsActive()

  useEffect(() => {
    if (year === '-1') return
    if (!historyLastApprovedIsActive) return

    dispatch(
      OriginalDataPointActions.getOriginalDataPointHistory({
        assessmentName,
        countryIso: countryIso as CountryIso,
        cycleName,
        sectionName,
        year,
      })
    )
  }, [assessmentName, countryIso, cycleName, dispatch, historyLastApprovedIsActive, sectionName, year])
}
