import { useEffect } from 'react'

import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { SectionName } from 'meta/assessment/section'

import { DataActions, useHistoryLastApprovedIsActive } from 'client/store/data'
import { useAppDispatch } from 'client/store/hooks'
import { useTableSections } from 'client/store/metadata'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

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
      dispatch(DataActions.getTableDataHistory(getParams))
    }
  }, [assessmentName, countryIso, cycleName, dispatch, historyLastApprovedIsActive, sectionName, tableNames])
}
