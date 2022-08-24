import { CountryIso } from '@meta/area'
import { OriginalDataPoint } from '@meta/assessment'

import { BaseProtocol, DB } from '@server/db'
import { AssessmentRepository } from '@server/repository/assessment/assessment'
import { OriginalDataPointRepository } from '@server/repository/assessmentCycle/originalDataPoint'

export const getOriginalDataPoint = async (
  props: { name: string; cycleName: string; year: string; countryIso: CountryIso },
  client: BaseProtocol = DB
): Promise<OriginalDataPoint> => {
  const { name, cycleName, year, countryIso } = props

  const assessment = await AssessmentRepository.read({ name })
  const assessmentCycle = assessment.cycles.find((cycle) => cycle.name === cycleName)
  return OriginalDataPointRepository.getOne({ assessment, assessmentCycle, year, countryIso }, client)
}
