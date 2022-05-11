import { CountryIso } from '@meta/area'
import { Assessment, Cycle, ReviewStatus } from '@meta/assessment'
import { User } from '@meta/user'

import { BaseProtocol, DB } from '@server/db'
import { MessageTopicUserRepository } from '@server/repository/assessmentCycle/messageTopicUser'

export const getReviewStatus = async (
  props: {
    countryIso: CountryIso
    assessment: Assessment
    cycle: Cycle
    section: string
    year?: string
    user: User
  },
  client: BaseProtocol = DB
): Promise<Array<ReviewStatus>> => {
  const { year } = props

  return year
    ? MessageTopicUserRepository.getOdpReviewStatus(props, client)
    : MessageTopicUserRepository.getReviewStatus(props, client)
}
