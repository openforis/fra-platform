import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { FRA } from '@core/assessment'
import { Objects } from '@core/utils'
import { batchActions, useAppSelector } from '../../../store'
import { SectionSpecs, TableSummarySpec } from '../../../sectionSpec'
import * as AssessmentState from '../../../app/assessment/assessmentState'
import { fetchTableData } from '../../../components/Assessment/DataTable/actions'
import { fetchUsers } from '../../../app/user/userManagement/actions'
import { OriginalDataPointActions } from '../../../store/page/originalDataPoint'

const useFraPrintDataFetch = (countryIso: string): { dataLoaded: boolean } => {
  const dispatch = useDispatch()

  const tables: Array<TableSummarySpec> = Object.values(FRA.sections).reduce<Array<TableSummarySpec>>(
    (tableFetchAgg, section) => {
      Object.values(section.children).forEach((sectionItem) => {
        const sectionName = sectionItem.name
        const tableSpecs = SectionSpecs.getTableSpecs(FRA.type, sectionName).filter((t) => !Objects.isEmpty(t.name))
        tableFetchAgg.push(...tableSpecs.map((t) => ({ assessmentType: FRA.type, sectionName, tableName: t.name })))
      })
      return tableFetchAgg
    },
    []
  )

  useEffect(() => {
    const actions = tables.map((table) => fetchTableData(FRA.type, table.sectionName, table.tableName))
    actions.push(fetchUsers(countryIso, true))
    dispatch(batchActions(actions))
    dispatch(OriginalDataPointActions.fetchODPs({ countryIso }))
  }, [])

  const dataLoaded = useAppSelector(
    (state) =>
      tables.every((table) =>
        AssessmentState.isSectionDataLoaded(table.assessmentType, table.sectionName, table.tableName)(state)
      ) &&
      // TODO add state objects
      (state as any).userManagement.countryUsers &&
      Boolean(state.page.originalDataPoint?.odps)
  )
  return {
    dataLoaded,
  }
}

export default useFraPrintDataFetch
