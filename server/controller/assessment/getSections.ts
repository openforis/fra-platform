import { BaseProtocol, DB } from '@server/db'
import { AssessmentRepository } from '@server/repository/assessment/assessment'

export const getSections = async (
  props: { assessmentName: string; cycleName: string },
  client: BaseProtocol = DB
): Promise<any> => {
  const { assessmentName, cycleName } = props

  const assessment = await AssessmentRepository.read({ assessmentName })
  const assessmentCycle = assessment.cycles.find((cycle) => cycle.name === cycleName)
  const assessmentSections = await AssessmentRepository.readSections(
    { assessment, assessmentCycleUuid: assessmentCycle.uuid },
    client
  )

  return assessmentSections
}
