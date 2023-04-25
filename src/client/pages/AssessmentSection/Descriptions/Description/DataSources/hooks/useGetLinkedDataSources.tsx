import { useEffect } from 'react'

import { DataSource, Description } from '@meta/assessment'

import { useAppDispatch } from '@client/store'
import { AssessmentSectionActions, useLinkedDataSources } from '@client/store/ui/assessmentSection'
import { useCountryIso } from '@client/hooks'

export const useGetLinkedDataSources = (props: {
  descriptions: Description
  sectionName: string
}): { linkedDataSources: Array<DataSource> | undefined } => {
  const { descriptions, sectionName } = props

  const countryIso = useCountryIso()
  const dispatch = useAppDispatch()
  const linkedDataSources = useLinkedDataSources({ sectionName })

  useEffect(() => {
    const linkedVariables = descriptions.nationalData?.dataSources?.linkedVariables ?? []
    if (linkedVariables.length) {
      dispatch(AssessmentSectionActions.getLinkedDataSources({ countryIso, linkedVariables, sectionName }))
    }
  }, [countryIso, descriptions.nationalData?.dataSources?.linkedVariables, dispatch, sectionName])

  return { linkedDataSources }
}
