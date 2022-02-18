import { BaseProtocol, DB } from '@server/db'
import { AssessmentRepository, OriginalDataPointRepository } from '@server/repository'
import { CountryIso } from '@meta/area'
import { AssessmentName } from '@meta/assessment'

export const getReservedYears = async (
  props: { assessmentName: AssessmentName; cycleName: string; countryIso: CountryIso },
  client: BaseProtocol = DB
): Promise<Array<number>> => {
  const { assessmentName, cycleName, countryIso } = props

  const assessment = await AssessmentRepository.read({ name: assessmentName })
  const assessmentCycle = assessment.cycles.find((cycle) => cycle.name === cycleName)
  return OriginalDataPointRepository.getReservedYears({ assessment, assessmentCycle, countryIso }, client)
}
