import { BaseProtocol, DB } from '@server/db'
import { AssessmentRepository } from '@server/repository'
import { Assessment } from '@core/meta/assessment'

export const getCountries = async (
  props: { assessment: Pick<Assessment, 'props'> },
  client: BaseProtocol = DB
): Promise<Array<{ countryIso: string }>> => {
  const { assessment } = props

  return AssessmentRepository.getCountries({ assessment }, client)
}
