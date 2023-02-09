import { useEffect } from 'react'

import { useAppDispatch } from '@client/store'
import { useAssessment, useAssessmentSection, useCycle } from '@client/store/assessment'
import { AssessmentSectionActions, useTableSections } from '@client/store/ui/assessmentSection'
import { useCountryIso } from '@client/hooks'

export const useGetTableSections = () => {
  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()

  const assessment = useAssessment()
  const cycle = useCycle()
  const section = useAssessmentSection()

  const tableSections = useTableSections({ sectionName: section?.props.name })

  useEffect(() => {
    // Fetch sections if current section empty
    if (tableSections.length < 1) {
      dispatch(
        AssessmentSectionActions.getTableSections({
          assessmentName: assessment.props.name,
          cycleName: cycle.name,
          sectionNames: [section?.props.name],
          countryIso,
        })
      )
    }
  }, [assessment.props.name, countryIso, cycle.name, dispatch, section?.props.name, tableSections.length])
}
