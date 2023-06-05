import { Assessment, Cycle } from 'meta/assessment'

import { BaseProtocol, DB } from 'server/db'
import { AssessmentRepository } from 'server/repository/assessment/assessment'

type Props = { assessmentName: string; metaCache?: boolean } | { id: number; metaCache?: boolean }

export const getOne = async (props: Props, client: BaseProtocol = DB): Promise<Assessment> => {
  return AssessmentRepository.getOne(props, client)
}

const _getCycleByName = (props: { cycleName?: string; assessment: Assessment }): Cycle | undefined => {
  const { cycleName, assessment } = props
  if (cycleName) return assessment.cycles.find((cycle) => cycle.name === cycleName)
  // Return default cycle if cycleName not defined
  return assessment.cycles.find((cycle) => cycle.uuid === assessment.props.defaultCycle)
}

const _getCycleByUuid = (props: { cycleUuid?: string; assessment: Assessment }): Cycle | undefined => {
  const { cycleUuid, assessment } = props
  if (cycleUuid) return assessment.cycles.find((cycle) => cycle.uuid === cycleUuid)
  // Return default cycle if cycleName not defined
  return assessment.cycles.find((cycle) => cycle.uuid === assessment.props.defaultCycle)
}

export const getOneWithCycle = async (
  props: Props & { cycleName?: string; cycleUuid?: string },
  client: BaseProtocol = DB
): Promise<{ assessment: Assessment; cycle: Cycle }> => {
  const { cycleName, cycleUuid } = props
  const assessment = await AssessmentRepository.getOne(props, client)
  const cycle = cycleName ? _getCycleByName({ cycleName, assessment }) : _getCycleByUuid({ cycleUuid, assessment })

  if (!cycle) {
    throw new Error(`Cycle ${cycleName} not found in assessment ${assessment.props.name}`)
  }

  return { assessment, cycle }
}
