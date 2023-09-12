import { createSelector } from '@reduxjs/toolkit'

import { TableName } from 'meta/assessment'

import { useAssessment, useCycle } from 'client/store/assessment'
import { TableDataStatus } from 'client/store/data/stateType'
import { RootState } from 'client/store/RootState'
import { useAppSelector } from 'client/store/store'
import { useCountryIso } from 'client/hooks'

export const useIsSomeTableDataFetching = (): boolean => {
  const assessment = useAssessment()
  const cycle = useCycle()
  const countryIso = useCountryIso()
  const assessmentName = assessment.props.name
  const cycleName = cycle.name

  return useAppSelector(
    createSelector(
      (state: RootState) => state,
      (state: RootState) => state.data.tableDataStatus[assessmentName]?.[cycleName]?.[countryIso] ?? {},
      (_, recordTableStatus: Record<TableName, TableDataStatus>) =>
        Object.values(recordTableStatus).some((status) => status === TableDataStatus.fetching)
    )
  )
}
