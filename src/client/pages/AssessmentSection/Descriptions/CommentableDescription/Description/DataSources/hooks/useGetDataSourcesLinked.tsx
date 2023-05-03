import { useEffect } from 'react'

import { DataSourceLinked, Description } from '@meta/assessment'

import { useAppDispatch } from '@client/store'
import { AssessmentSectionActions, useDataSourcesLinked } from '@client/store/ui/assessmentSection'
import { useCountryIso } from '@client/hooks'

export const useGetDataSourcesLinked = (props: {
  descriptions: Description
  sectionName: string
}): { dataSourcesLinked: Array<DataSourceLinked> | undefined } => {
  const { descriptions, sectionName } = props

  const countryIso = useCountryIso()
  const dispatch = useAppDispatch()
  const linkedDataSources = useDataSourcesLinked({ sectionName })

  useEffect(() => {
    const linkedVariables = descriptions.nationalData?.dataSources?.linkedVariables ?? []
    if (linkedVariables.length) {
      dispatch(AssessmentSectionActions.getLinkedDataSources({ countryIso, linkedVariables, sectionName }))
    }
  }, [countryIso, descriptions.nationalData?.dataSources?.linkedVariables, dispatch, sectionName])

  return { dataSourcesLinked: linkedDataSources }
}
