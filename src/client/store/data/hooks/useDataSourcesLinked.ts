import { DataSourceLinked } from 'meta/assessment'

import { useAppSelector } from 'client/store'
import { useAssessment, useCycle } from 'client/store/assessment'

export const useDataSourcesLinked = (props: { sectionName: string }): Array<DataSourceLinked> | undefined => {
  const { sectionName } = props

  const assessment = useAssessment()
  const cycle = useCycle()
  const assessmentName = assessment.props.name
  const cycleName = cycle.name

  return useAppSelector((state) => state.data[assessmentName]?.[cycleName]?.linkedDataSources?.[sectionName])
}
