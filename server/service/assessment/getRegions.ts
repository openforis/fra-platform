import { BaseProtocol, DB } from '@server/db'
import { AssessmentRepository } from '@server/repository'
import { Assessment } from '@core/meta/assessment'

export const getRegions = async (
  props: { assessment: Pick<Assessment, 'props'> },
  client: BaseProtocol = DB
): Promise<
  Array<{
    regionCode: string
  }>
> => {
  const { assessment } = props

  return AssessmentRepository.getRegions({ assessment }, client)
}
