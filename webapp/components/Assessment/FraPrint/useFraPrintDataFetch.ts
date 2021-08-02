import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { FRA } from '@core/assessment'
import { Objects } from '@core/utils'
import { batchActions } from '@webapp/main/reduxBatch'
import { SectionSpecs, TableSummarySpec } from '@webapp/sectionSpec'
import * as AssessmentState from '@webapp/app/assessment/assessmentState'
import { fetchTableData } from '@webapp/app/assessment/components/dataTable/actions'
import { fetchUsers } from '@webapp/app/user/userManagement/actions'
import { fetchOdps } from '@webapp/sectionSpec/fra/originalDataPoint/actions'

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
    actions.push(fetchOdps(countryIso))
    dispatch(batchActions(actions))
  }, [])

  const dataLoaded = useSelector(
    (state) =>
      tables.every((table) =>
        AssessmentState.isSectionDataLoaded(table.assessmentType, table.sectionName, table.tableName)(state)
      ) &&
      // TODO add state objects
      (state as any).userManagement.countryUsers &&
      (state as any).originalDataPoint.odps
  )
  return {
    dataLoaded,
  }
}

export default useFraPrintDataFetch
