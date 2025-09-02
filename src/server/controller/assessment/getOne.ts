import { Assessment } from 'meta/assessment/assessment'
import { Assessments } from 'meta/assessment/assessments'
import { Cycle } from 'meta/assessment/cycle'

import { BaseProtocol, DB } from 'server/db'
import { AssessmentRepository } from 'server/repository/assessment/assessment'

type Props =
  | { assessmentName: string; metaCache?: boolean }
  | { id: number; metaCache?: boolean }
  | { uuid: string; metaCache?: boolean }

const _getCycleByName = (props: { cycleName?: string; assessment: Assessment }): Cycle | undefined => {
  const { assessment, cycleName } = props
  if (cycleName) return assessment.cycles.find((cycle) => cycle.name === cycleName)
  // Return default cycle if cycleName not defined
  return Assessments.getLastPublishedCycle(assessment)
}

const _getCycleByUuid = (props: { cycleUuid?: string; assessment: Assessment }): Cycle | undefined => {
  const { assessment, cycleUuid } = props
  if (cycleUuid) return assessment.cycles.find((cycle) => cycle.uuid === cycleUuid)
  // Return default cycle if cycleName not defined
  return Assessments.getLastPublishedCycle(assessment)
}

/**
 * @deprecated
 */
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
