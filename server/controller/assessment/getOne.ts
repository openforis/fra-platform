import { Assessment, Cycle } from '@meta/assessment'

import { BaseProtocol, DB } from '@server/db'
import { AssessmentRepository } from '@server/repository/assessment/assessment'

type Props = { assessmentName: string; metaCache?: boolean } | { id: number; metaCache?: boolean }

export const getOne = async (props: Props, client: BaseProtocol = DB): Promise<Assessment> => {
  return AssessmentRepository.read(props, client)
}

const _getCycle = (props: { cycleName?: string; assessment: Assessment }): Cycle | undefined => {
  const { cycleName, assessment } = props
  if (cycleName) return assessment.cycles.find((cycle) => cycle.name === cycleName)
  // Return default cycle if cycleName not defined
  return assessment.cycles.find((cycle) => cycle.uuid === assessment.props.defaultCycle)
}

export const getOneWithCycle = async (
  props: Props & { cycleName?: string },
  client: BaseProtocol = DB
): Promise<{ assessment: Assessment; cycle: Cycle }> => {
  const { cycleName } = props
  const assessment = await AssessmentRepository.read(props, client)
  const cycle = _getCycle({ cycleName, assessment })

  if (!cycle) {
    throw new Error(`Cycle ${cycleName} not found in assessment ${assessment.props.name}`)
  }

  return { assessment, cycle }
}
