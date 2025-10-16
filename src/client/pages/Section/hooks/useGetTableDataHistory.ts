import { useEffect } from 'react'

import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { SectionName } from 'meta/assessment/section'

import { HistoryActions } from 'client/store/data/history/actions'
import { useHistoryLastApprovedIsActive } from 'client/store/data/history/hooks/lastApproved'
import { useAppDispatch } from 'client/store/hooks'
import { useTableSections } from 'client/store/meta/hooks/tableSections'
import { useCountryRouteParams } from 'client/hooks/routeParams'

type Props = { sectionName: SectionName }

export const useGetTableDataHistory = (props: Props): void => {
  const { sectionName } = props

  const dispatch = useAppDispatch()
  const { assessmentName, countryIso: _countryIso, cycleName } = useCountryRouteParams()
  const countryIso = _countryIso as CountryIso
  const historyLastApprovedIsActive = useHistoryLastApprovedIsActive()

  const tableSections = useTableSections({ sectionName })
  const tableNames = tableSections.flatMap((tableSection) => tableSection.tables.flatMap((table) => table.props.name))

  useEffect(() => {
    // TableSections might not be initialised on first load
    if (historyLastApprovedIsActive && !Objects.isEmpty(tableNames)) {
      const getParams = { countryIso, assessmentName, cycleName, sectionName, tableNames }
      dispatch(HistoryActions.getTableDataHistory(getParams))
    }
  }, [assessmentName, countryIso, cycleName, dispatch, historyLastApprovedIsActive, sectionName, tableNames])
}
