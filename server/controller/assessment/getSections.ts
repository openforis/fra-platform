import { BaseProtocol, DB } from '@server/db'
import { AssessmentRepository } from '@server/repository'

export const getSections = async (
  props: { name: string; cycleName: string },
  client: BaseProtocol = DB
): Promise<any> => {
  const { name, cycleName } = props

  const assessment = await AssessmentRepository.read({ name })
  const assessmentCycle = assessment.cycles.find((cycle) => cycle.name === cycleName)
  const assessmentSections = await AssessmentRepository.readSections(
    { assessment, assessmentCycleUuid: assessmentCycle.uuid },
    client
  )

  return assessmentSections
}
