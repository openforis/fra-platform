import { createSelector } from '@reduxjs/toolkit'

import { TableSection } from 'meta/assessment'

import { RootState, useAppSelector } from 'client/store'
import { useAssessment, useCycle } from 'client/store/assessment'

type Props = {
  sectionName: string
}

export const useTableSections = (props: Props): Array<TableSection> => {
  const { sectionName } = props

  const assessment = useAssessment()
  const cycle = useCycle()

  const assessmentName = assessment.props.name
  const cycleName = cycle.name

  return useAppSelector(
    createSelector(
      (state: RootState) => state,
      (state: RootState) => state.metadata.tableSections?.[assessmentName]?.[cycleName]?.[sectionName] ?? []
    )
  )
}
