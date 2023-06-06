import { CountryIso } from 'meta/area'
import { Assessment, Cycle, ReviewStatus } from 'meta/assessment'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
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
