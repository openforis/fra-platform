import { useParams } from 'react-router-dom'
import { useAppSelector } from '@client/store'
import { Cycle } from '@meta/assessment'

/**
 * Return current cycle
 * Prioritize URL params
 * If not found, take default from <current>assessment.props
 * @returns Cycle
 */
export const useCycle = (): Cycle | undefined => {
  const { cycleName } = useParams<{ cycleName: string }>()
  const defaultCycleUuid = useAppSelector((state) => state.assessment?.assessment?.props.defaultCycle)
  const cycle = useAppSelector((state) => {
    const { cycles } = state.assessment?.assessment

    if (cycleName) {
      return cycles.find(({ name }) => cycleName === name)
    }

    return cycles.find(({ uuid }) => defaultCycleUuid === uuid)
  })
  return cycle
}
