import { BaseProtocol, DB } from '@server/db'
import { MessageTopic, MessageTopicStatus } from '@meta/topic/topic'
import { CountryIso } from '@meta/area'
import { Assessment, Cycle } from '@meta/assessment'
import { MessageTopicRepository } from '@server/repository/messageTopic'

export const create = async (
  props: {
    countryIso: CountryIso
    assessment: Assessment
    cycle: Cycle
    key: string
    status: MessageTopicStatus
  },
  client: BaseProtocol = DB
): Promise<MessageTopic> => {
  const { countryIso, assessment, cycle, key, status } = props

  return client.tx(async (t) => {
    const messageTopic = await MessageTopicRepository.create(
      {
        countryIso,
        assessment,
        cycle,
        key,
        status,
      },
      t
    )

    return messageTopic
  })
}
