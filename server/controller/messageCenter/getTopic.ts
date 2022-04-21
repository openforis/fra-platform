import { CountryIso } from '@meta/area'
import { Assessment, Cycle } from '@meta/assessment'
import { MessageTopic } from '@meta/messageCenter'

import { BaseProtocol, DB } from '@server/db'
import { MessageTopicRepository } from '@server/repository/assessmentCycle/messageTopic'

export const getTopic = async (
  props: {
    countryIso: CountryIso
    assessment: Assessment
    cycle: Cycle
    key: string
    includeMessages?: boolean
  },
  client: BaseProtocol = DB
): Promise<MessageTopic | undefined> => {
  const { countryIso, assessment, cycle, key, includeMessages = true } = props

  return MessageTopicRepository.getOneOrNone({ countryIso, assessment, cycle, key, includeMessages }, client)
}
