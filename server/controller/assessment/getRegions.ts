import { BaseProtocol, DB } from '@server/db'
import { AssessmentRepository } from '@server/repository'

export const getRegions = async (
  props: { name: string },
  client: BaseProtocol = DB
): Promise<
  Array<{
    regionCode: string
  }>
> => {
  const { name } = props

  return AssessmentRepository.getRegions({ name }, client)
}
