import { BaseProtocol, DB } from '@server/db'
import { AssessmentRepository } from '@server/repository'

export const getCountries = async (
  props: { name: string },
  client: BaseProtocol = DB
): Promise<Array<{ countryIso: string }>> => {
  const { name } = props

  return AssessmentRepository.getCountries({ name }, client)
}
