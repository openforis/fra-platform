import { BaseProtocol, DB } from '@server/db'
import { AssessmentCountryRepository } from '@server/repository'
import { Assessment } from '@core/meta/assessment'
import { AssessmentCountry } from '@core/meta/assessmentCountry'

export const readAll = async (
  props: { assessment: Pick<Assessment, 'props'> },
  client: BaseProtocol = DB
): Promise<Array<AssessmentCountry>> => {
  const { assessment } = props

  return AssessmentCountryRepository.readAll({ assessment }, client)
}
