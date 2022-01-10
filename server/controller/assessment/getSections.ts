import { BaseProtocol, DB } from '@server/db'
import { AssessmentRepository } from '@server/repository'

export const getSections = async (
  props: { assessmentName: string; assessmentCycleName: string },
  client: BaseProtocol = DB
): Promise<any> => {
  const { assessmentName, assessmentCycleName } = props

  const assessmentCycle = await AssessmentRepository.readCycle({ assessmentCycleName }, client)
  const assessmentSections = await AssessmentRepository.readSections(
    { assessmentName, assessmentCycleUuid: assessmentCycle.uuid },
    client
  )

  return assessmentSections
}
