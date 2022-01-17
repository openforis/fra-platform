import { BaseProtocol, DB } from '@server/db'
import { AssessmentRepository } from '@server/repository'
import { OriginalDataPoint } from '@meta/assessment'

export const getOdp = async (
  props: { name: string; cycleName: string; odpId: string },
  client: BaseProtocol = DB
): Promise<OriginalDataPoint> => {
  const { name, cycleName, odpId } = props

  const assessment = await AssessmentRepository.read({ name })
  const assessmentCycle = assessment.cycles.find((cycle) => cycle.name === cycleName)
  const originalDataPoint = await AssessmentRepository.readOdp({ assessment, assessmentCycle, odpId }, client)

  return originalDataPoint
}
