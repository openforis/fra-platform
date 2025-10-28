import { CountryIso } from 'meta/area'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { ReviewStatus } from 'meta/assessment/review'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db/db'
import { MessageTopicUserRepository } from 'server/repository/assessmentCycle/messageTopicUser'

export const getReviewStatus = async (
  props: {
    countryIso: CountryIso
    assessment: Assessment
    cycle: Cycle
    sectionName: string
    user: User
    odpId?: string
  },
  client: BaseProtocol = DB
): Promise<Array<ReviewStatus>> => {
  const { odpId } = props

  return odpId
    ? MessageTopicUserRepository.getOdpReviewStatus(props, client)
    : MessageTopicUserRepository.getReviewStatus(props, client)
}
