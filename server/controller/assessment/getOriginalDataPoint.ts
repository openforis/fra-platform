import { BaseProtocol, DB } from '@server/db'
import { AssessmentRepository, OriginalDataPointRepository } from '@server/repository'
import { OriginalDataPoint } from '@meta/assessment'
import { CountryIso } from '@meta/area'

export const getOriginalDataPoint = async (
  props: { name: string; cycleName: string; year: string; countryIso: CountryIso },
  client: BaseProtocol = DB
): Promise<OriginalDataPoint> => {
  const { name, cycleName, year, countryIso } = props

  const assessment = await AssessmentRepository.read({ name })
  const assessmentCycle = assessment.cycles.find((cycle) => cycle.name === cycleName)
  return OriginalDataPointRepository.getOne({ assessment, assessmentCycle, year, countryIso }, client)
}
