import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as R from 'ramda'
import { batchActions } from '@webapp/main/reduxBatch'
import { FRA } from '@core/assessment'
import * as SectionSpecs from '@webapp/app/assessment/components/section/sectionSpecs'
import * as SectionSpec from  '@webapp/app/assessment/components/section/sectionSpec'
import * as AssessmentState from '@webapp/app/assessment/assessmentState'
import { fetchTableData } from '@webapp/app/assessment/components/dataTable/actions'
import { fetchUsers } from '@webapp/app/user/userManagement/actions'
import { fetchOdps } from '@webapp/app/assessment/fra/sections/originalDataPoint/actions'

const useFraPrintDataFetch = (countryIso: any) => {
  const dispatch = useDispatch()
  const tables = Object.values(FRA.sections)
    .map((section) =>
      Object.values((section as any).children).map((sectionItem) => {
        const { name: sectionName }: any = sectionItem
        const tableSpecs = SectionSpecs.getTableSpecs(FRA.type, sectionName)
        return tableSpecs.map((tableSpec: any) => ({
          sectionName,
          tableName: tableSpec[SectionSpec.KEYS_TABLE.name],
        }))
      })
    )
    .flat(Infinity)
    .filter((table: any) => !R.isEmpty(table.tableName))
  useEffect(() => {
    const actions = tables.map((table: any) => fetchTableData(FRA.type, table.sectionName, table.tableName))
    actions.push(fetchUsers(countryIso, true))
    actions.push(fetchOdps(countryIso))
    dispatch(batchActions(actions))
  }, [])
  const dataLoaded = useSelector(
    (state) =>
      tables.every((table: any) =>
        AssessmentState.isSectionDataLoaded(FRA.type, table.sectionName, table.tableName)(state)
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
