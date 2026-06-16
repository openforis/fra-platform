import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { ReviewStatus } from 'meta/assessment/review'
import { User } from 'meta/user/user'

import { BaseProtocol, DB } from 'server/db/db'
import { MessageTopicUserRepository } from 'server/db/repository/assessmentCycle/messageTopicUser'

type Props = {
  countryIso: CountryIso
  assessment: Assessment
  cycle: Cycle
  sectionName: string
  user: User
  odpId?: string
}

export const getReviewStatus = async (props: Props, client: BaseProtocol = DB): Promise<Array<ReviewStatus>> => {
  const { odpId } = props

  return odpId
    ? MessageTopicUserRepository.getOdpReviewStatus(props, client)
    : MessageTopicUserRepository.getReviewStatus(props, client)
}
