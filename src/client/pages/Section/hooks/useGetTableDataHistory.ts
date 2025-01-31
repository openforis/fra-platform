import { useEffect } from 'react'

import { CountryIso } from 'meta/area'
import { SectionName } from 'meta/assessment'

import { useAppDispatch } from 'client/store'
import { DataActions, useHistoryLastApprovedIsActive } from 'client/store/data'
import { useTableSections } from 'client/store/metadata'
import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

type Props = { sectionName: SectionName }

export const useGetTableDataHistory = (props: Props): void => {
  const { sectionName } = props

  const dispatch = useAppDispatch()
  const { print } = useIsPrintRoute()
  const { assessmentName, cycleName, countryIso: _countryIso } = useCountryRouteParams()
  const countryIso = _countryIso as CountryIso
  const historyLastApprovedIsActive = useHistoryLastApprovedIsActive()

  const tableSections = useTableSections({ sectionName })
  const tableNames = tableSections.flatMap((tableSection) => tableSection.tables.flatMap((table) => table.props.name))

  useEffect(() => {
    if (!print && historyLastApprovedIsActive) {
      const getParams = { countryIso, assessmentName, cycleName, sectionName, tableNames }
      dispatch(DataActions.getTableDataHistory(getParams))
    }
  }, [assessmentName, countryIso, cycleName, dispatch, historyLastApprovedIsActive, print, sectionName, tableNames])
}
