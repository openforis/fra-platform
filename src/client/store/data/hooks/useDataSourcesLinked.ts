import { DataSourceLinked } from 'meta/assessment/descriptionValue'

import { useAppSelector } from 'client/store/hooks'
import { useAssessment } from 'client/store/meta/hooks/assessments'
import { useCycle } from 'client/store/meta/hooks/cycles'

export const useDataSourcesLinked = (props: { sectionName: string }): Array<DataSourceLinked> | undefined => {
  const { sectionName } = props

  const assessment = useAssessment()
  const cycle = useCycle()
  const assessmentName = assessment.props.name
  const cycleName = cycle.name

  return useAppSelector((state) => state.dataDep[assessmentName]?.[cycleName]?.linkedDataSources?.[sectionName])
}
