import { BaseProtocol, DB } from '@server/db'
import { MessageTopic } from '@meta/messageCenter'
import { CountryIso } from '@meta/area'
import { MessageTopicRepository } from '@server/repository/messageTopic'
import { AssessmentController } from '../assessment'

export const getTopic = async (
  props: {
    countryIso: CountryIso
    assessmentName: string
    cycleName: string
    includeMessages?: boolean
  },
  client: BaseProtocol = DB
): Promise<MessageTopic> => {
  const { countryIso, assessmentName, cycleName, includeMessages = true } = props

  return client.tx(async () => {
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ name: assessmentName, cycleName })

    return MessageTopicRepository.getOneOrNone({ countryIso, assessment, cycle, includeMessages })
  })
}
