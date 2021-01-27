import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'
import { batchActions } from '@webapp/main/reduxBatch'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as FRA from '@common/assessment/fra'
import * as SectionSpecs from '@webapp/app/assessment/components/section/sectionSpecs'
import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'
import * as AssessmentState from '@webapp/app/assessment/assessmentState'
import { fetchTableData } from '@webapp/app/assessment/components/dataTable/actions'
import { fetchUsers } from '@webapp/app/user/userManagement/actions'
import { fetchOdps } from '@webapp/app/assessment/fra/sections/originalDataPoint/actions'

const useFraPrintDataFetch = (countryIso: any) => {
  const dispatch = useDispatch()
  const tables = Object.values(FRA.sections)
    .map((section) =>
      Object.values((section as any).children).map((sectionItem) => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type '{}'.
        const { name: sectionName } = sectionItem
        const tableSpecs = SectionSpecs.getTableSpecs(FRA.type, sectionName)
        return tableSpecs.map((tableSpec: any) => ({
          sectionName,
          tableName: tableSpec[SectionSpec.KEYS_TABLE.name],
        }))
      })
    )
    // @ts-expect-error ts-migrate(2550) FIXME: Property 'flat' does not exist on type 'any[][]'. ... Remove this comment to see the full error message
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
