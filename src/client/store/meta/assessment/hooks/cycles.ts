import { useMemo } from 'react'

import { Assessments } from 'meta/assessment/assessments'
import { Cycle, CycleUuid } from 'meta/assessment/cycle'

import { useAssessment } from 'client/store/meta/assessment/hooks/assessments'
import { useCycleRouteParams } from 'client/hooks/useRouteParams'

export const useCycle = (cycleUuid?: CycleUuid): Cycle => {
  const { cycleName } = useCycleRouteParams()
  const assessment = useAssessment()

  return useMemo<Cycle>(() => {
    if (!assessment) return undefined
    if (cycleUuid) return assessment.cycles.find((cycle) => cycle.uuid === cycleUuid)
    if (cycleName) return assessment.cycles.find((cycle) => cycle.name === cycleName)
    return Assessments.getLastPublishedCycle(assessment)
  }, [assessment, cycleName, cycleUuid])
}

export const useLastPublishedCycle = () => {
  const assessment = useAssessment()
  return Assessments.getLastPublishedCycle(assessment)
}
