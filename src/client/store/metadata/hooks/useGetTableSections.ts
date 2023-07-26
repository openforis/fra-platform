import { useEffect } from 'react'

import { useAppDispatch } from 'client/store'
import { useAssessment, useAssessmentSection, useCycle } from 'client/store/assessment'
import { useCountryIso } from 'client/hooks'

import { MetadataActions } from '../slice'
import { useTableSections } from './useTableSections'

export const useGetTableSections = () => {
  const dispatch = useAppDispatch()
  const assessment = useAssessment()
  const cycle = useCycle()
  const countryIso = useCountryIso()
  const section = useAssessmentSection()

  const assessmentName = assessment.props.name
  const cycleName = cycle.name
  const sectionName = section?.props.name
  const tableSections = useTableSections({ sectionName })

  useEffect(() => {
    // Fetch sections if current section empty
    if (tableSections.length < 1) {
      const sectionNames = [sectionName]
      dispatch(MetadataActions.getTableSections({ assessmentName, cycleName, countryIso, sectionNames }))
    }
  }, [assessmentName, countryIso, cycleName, dispatch, sectionName, tableSections.length])
}
