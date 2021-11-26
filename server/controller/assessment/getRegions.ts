import { BaseProtocol, DB } from '@server/db'
import { AssessmentRepository } from '@server/repository'
import { Region } from '@core/country'

export const getRegions = async (props: { name: string }, client: BaseProtocol = DB): Promise<Array<Region>> => {
  const { name } = props

  return AssessmentRepository.getRegions({ name }, client)
}
