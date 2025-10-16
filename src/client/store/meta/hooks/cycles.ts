import { useMemo } from 'react'

import { Assessments } from 'meta/assessment/assessments'
import { Cycle, CycleUuid } from 'meta/assessment/cycle'

import { useAssessment } from 'client/store/meta/hooks/assessments'
import { useCycleRouteParams } from 'client/hooks/routeParams'

export const useCycle = (cycleUuid?: CycleUuid): Cycle => {
  const { cycleName } = useCycleRouteParams()
  const assessment = useAssessment()

  return useMemo<Cycle>(() => {
    if (!assessment) return undefined
    if (cycleUuid) return Assessments.getCycle({ assessment, cycleUuid })
    if (cycleName) return Assessments.getCycle({ assessment, cycleName })
    return Assessments.getLastPublishedCycle(assessment)
  }, [assessment, cycleName, cycleUuid])
}

export const useLastPublishedCycle = (): Cycle => {
  const assessment = useAssessment()
  return Assessments.getLastPublishedCycle(assessment)
}
