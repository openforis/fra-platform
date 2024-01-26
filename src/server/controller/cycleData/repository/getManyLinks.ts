import { AreaCode } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { Repository } from 'meta/cycleData'

import { RepositoryRepository } from 'server/repository/assessmentCycle/repository'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: AreaCode
}
export const getManyLinks = async (props: Props): Promise<Array<Repository>> => {
  return RepositoryRepository.getMany({ ...props, links: true })
}
