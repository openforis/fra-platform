import { useEffect } from 'react'

import { DataSourceLinked, Description } from '@meta/assessment'

import { useAppDispatch } from '@client/store'
import { useAssessment, useCycle } from '@client/store/assessment'
import { AssessmentSectionActions, useDataSourcesLinked } from '@client/store/ui/assessmentSection'
import { useCountryIso } from '@client/hooks'

export const useGetDataSourcesLinked = (props: {
  descriptions: Description
  sectionName: string
}): { dataSourcesLinked: Array<DataSourceLinked> | undefined } => {
  const assessment = useAssessment()
  const cycle = useCycle()
  const { descriptions, sectionName } = props

  const countryIso = useCountryIso()
  const dispatch = useAppDispatch()
  const linkedDataSources = useDataSourcesLinked({ sectionName })

  useEffect(() => {
    const linkedVariables = descriptions.nationalData?.dataSources?.linkedVariables ?? []
    if (linkedVariables.length) {
      dispatch(
        AssessmentSectionActions.getLinkedDataSources({
          countryIso,
          linkedVariables,
          sectionName,
          assessmentName: assessment.props.name,
          cycleName: cycle.name,
        })
      )
    }
  }, [
    assessment.props.name,
    countryIso,
    cycle.name,
    descriptions.nationalData?.dataSources?.linkedVariables,
    dispatch,
    sectionName,
  ])

  return { dataSourcesLinked: linkedDataSources }
}
