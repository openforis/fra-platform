import { useEffect } from 'react'

import { DataActions, useHistoryLastApprovedIsActive } from 'client/store/data'
import { useAppDispatch } from 'client/store/hooks'
import { useSection } from 'client/store/meta/hooks/sections'
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
      DataActions.getOriginalDataPointHistory({
        assessmentName,
        countryIso,
        cycleName,
        sectionName,
        year,
      })
    )
  }, [assessmentName, countryIso, cycleName, dispatch, historyLastApprovedIsActive, sectionName, year])
}
