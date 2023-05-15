import { DataSourceLinked } from '@meta/assessment'

import { useAppSelector } from '@client/store'
import { useAssessment, useCycle } from '@client/store/assessment'

export const useDataSourcesLinked = (props: { sectionName: string }): Array<DataSourceLinked> | undefined => {
  const assessment = useAssessment()
  const cycle = useCycle()

  return useAppSelector((state) => state.data[assessment.props.name][cycle.name].linkedDataSources[props.sectionName])
}
