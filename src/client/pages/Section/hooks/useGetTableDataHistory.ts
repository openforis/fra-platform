import { useEffect } from 'react'

import { CountryIso } from 'meta/area'
import { SectionName } from 'meta/assessment'

import { useAppDispatch } from 'client/store'
import { DataActions, useHistoryLastApprovedIsActive } from 'client/store/data'
import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { useDependencies } from 'client/pages/Section/hooks/useGetTableData/useDependencies'

type Props = { sectionName: SectionName }

export const useGetTableDataHistory = (props: Props): void => {
  const { sectionName } = props

  const dispatch = useAppDispatch()
  const { print } = useIsPrintRoute()
  const { assessmentName, cycleName, countryIso: _countryIso } = useCountryRouteParams()
  const countryIso = _countryIso as CountryIso
  const historyLastApprovedIsActive = useHistoryLastApprovedIsActive()

  const dependencies = useDependencies(props)

  useEffect(() => {
    if (!print && historyLastApprovedIsActive) {
      const tableNames = Array.from(dependencies.internal.tableNames)
      dispatch(
        DataActions.getTableDataHistory({
          countryIso,
          assessmentName,
          cycleName,
          sectionName,
          tableNames,
        })
      )
    }
  }, [
    assessmentName,
    countryIso,
    cycleName,
    dependencies.internal.tableNames,
    dispatch,
    historyLastApprovedIsActive,
    print,
    sectionName,
  ])
}
