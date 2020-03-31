import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as R from 'ramda'

import { batchActions } from '@webapp/main/reduxBatch'

import * as FRA from '@common/assessment/fra'
import * as SectionSpecs from '@webapp/app/assessment/components/section/sectionSpecs'
import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

import * as AssessmentState from '@webapp/app/assessment/assessmentState'
import { fetchTableData } from '@webapp/app/assessment/components/dataTable/actions'
import { fetchUsers } from '@webapp/app/user/userManagement/actions'
import { fetchOdps } from '@webapp/app/assessment/fra/sections/originalDataPoint/actions'

const useFraPrintDataFetch = (countryIso) => {
  const dispatch = useDispatch()

  const tables = Object.values(FRA.sections)
    .map((section) =>
      Object.values(section.children).map((sectionItem) => {
        const { name: sectionName } = sectionItem
        const tableSpecs = SectionSpecs.getTableSpecs(FRA.type, sectionName)
        return tableSpecs.map((tableSpec) => ({
          sectionName,
          tableName: tableSpec[SectionSpec.KEYS_TABLE.name],
        }))
      })
    )
    .flat(Infinity)
    .filter((table) => !R.isEmpty(table.tableName))

  useEffect(() => {
    const actions = tables.map((table) => fetchTableData(FRA.type, table.sectionName, table.tableName))
    actions.push(fetchUsers(countryIso, true))
    actions.push(fetchOdps(countryIso))

    dispatch(batchActions(actions))
  }, [])

  const dataLoaded = useSelector(
    (state) =>
      tables.every((table) =>
        AssessmentState.isSectionDataLoaded(FRA.type, table.sectionName, table.tableName)(state)
      ) &&
      // TODO add state objects
      state.userManagement.countryUsers &&
      state.originalDataPoint.odps
  )

  return {
    dataLoaded,
  }
}

export default useFraPrintDataFetch
