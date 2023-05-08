import { useParams } from 'react-router-dom'

import { Cycle, CycleUuid } from '@meta/assessment'

import { useAppSelector } from '@client/store'

/**
 * Return current cycle
 * Prioritize URL params
 * If not found, take default from <current>assessment.props
 * @returns Cycle
 */
export const useCycle = (cycleUuid?: CycleUuid): Cycle | undefined => {
  const { cycleName, assessmentName } = useParams<{ cycleName: string; assessmentName: string }>()
  const defaultCycleUuid = useAppSelector((state) => state.assessment?.[assessmentName]?.props.defaultCycle)
  const cycle = useAppSelector((state) => {
    const { cycles } = state.assessment?.[assessmentName] ?? { cycles: [] as Array<Cycle> }

    if (cycleUuid) {
      return cycles.find(({ uuid }) => uuid === cycleUuid)
    }

    if (cycleName) {
      return cycles.find(({ name }) => cycleName === name)
    }

    return cycles.find(({ uuid }) => defaultCycleUuid === uuid)
  })
  return cycle
}
