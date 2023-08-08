import { useMemo } from 'react'

import { Assessment, Cycle, CycleUuid } from 'meta/assessment'

import { AssessmentSelectors } from 'client/store/assessment/selectors'
import { useAppSelector } from 'client/store/store'
import { useAssessmentRouteParams, useCountryRouteParams } from 'client/hooks/useRouteParams'

export const useAssessment = (): Assessment => {
  const { assessmentName } = useAssessmentRouteParams()
  return useAppSelector((state) => {
    if (assessmentName) return AssessmentSelectors.getAssessment(state, assessmentName)
    return AssessmentSelectors.getDefaultAssessment(state)
  })
}

export const useCycle = (cycleUuid?: CycleUuid): Cycle => {
  const { cycleName } = useCountryRouteParams()
  const assessment = useAssessment()

  return useMemo<Cycle>(() => {
    if (!assessment) return undefined
    if (cycleUuid) return assessment.cycles.find((cycle) => cycle.uuid === cycleUuid)
    if (cycleName) return assessment.cycles.find((cycle) => cycle.name === cycleName)
    return assessment.cycles.find((cycle) => cycle.uuid === assessment.props.defaultCycle)
  }, [assessment, cycleName, cycleUuid])
}
