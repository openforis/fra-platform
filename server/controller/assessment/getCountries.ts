import { BaseProtocol, DB } from '@server/db'
import { AssessmentRepository } from '@server/repository'
import { Country } from '@core/country'

export const getCountries = async (props: { name: string }, client: BaseProtocol = DB): Promise<Array<Country>> => {
  const { name } = props

  return AssessmentRepository.getCountries({ name }, client)
}
