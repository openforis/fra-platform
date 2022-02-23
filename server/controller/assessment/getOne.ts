import { BaseProtocol, DB } from '@server/db'
import { AssessmentRepository } from '@server/repository'
import { Assessment, Cycle } from '@meta/assessment'

type Props = { name: string; metaCache?: boolean } | { id: number; metaCache?: boolean }

export const getOne = async (props: Props, client: BaseProtocol = DB): Promise<Assessment> => {
  return AssessmentRepository.read(props, client)
}

export const getOneWithCycle = async (
  props: Props & { cycleName: string },
  client: BaseProtocol = DB
): Promise<{ assessment: Assessment; cycle: Cycle }> => {
  const { cycleName } = props
  const assessment = await AssessmentRepository.read(props, client)
  const cycle = assessment.cycles.find((cycle) => cycle.name === cycleName)

  if (!cycle) {
    throw new Error(`Cycle ${cycleName} not found in assessment ${assessment.props.name}`)
  }

  return { assessment, cycle }
}
