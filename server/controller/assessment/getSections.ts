import { BaseProtocol, DB } from '@server/db'
import { AssessmentRepository } from '@server/repository'

export const getSections = async (
  props: { assessmentName: string; assessmentCycleName: string },
  client: BaseProtocol = DB
): Promise<any> => {
  const { assessmentName, assessmentCycleName } = props

  const assessment = await AssessmentRepository.read({ name: assessmentName }, client)
  const assessmentSections = await AssessmentRepository.readSections(
    { assessmentName, assessmentUuid: assessment.uuid },
    client
  )

  return assessmentSections
}
