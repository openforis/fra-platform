import { TableSection } from 'meta/assessment'

import { useAppSelector } from 'client/store'
import { useAssessment, useCycle } from 'client/store/assessment'

export const useTableSections = (props: { sectionName: string }): Array<TableSection> => {
  const assessment = useAssessment()
  const cycle = useCycle()

  return useAppSelector(
    (state) => state.metadata.tableSections?.[assessment.props.name]?.[cycle.name]?.[props.sectionName] ?? []
  )
}
