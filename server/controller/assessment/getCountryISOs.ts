import { BaseProtocol, DB } from '@server/db'
import { AssessmentRepository } from '@server/repository'
import { Country } from '@core/country'

export const getCountryISOs = async (props: { name: string }, client: BaseProtocol = DB): Promise<Array<Country>> => {
  const { name } = props

  return AssessmentRepository.getCountryISOs({ name }, client)
}
