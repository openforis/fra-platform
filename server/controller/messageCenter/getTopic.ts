import { BaseProtocol, DB } from '@server/db'
import { MessageTopic } from '@meta/messageCenter'
import { CountryIso } from '@meta/area'
import { Assessment, Cycle } from '@meta/assessment'
import { MessageTopicRepository } from '@server/repository/messageTopic'

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
