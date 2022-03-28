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
    key: string
    includeMessages?: boolean
  },
  client: BaseProtocol = DB
): Promise<MessageTopic | undefined> => {
  const { countryIso, assessmentName, cycleName, key, includeMessages = true } = props

  const { assessment, cycle } = await AssessmentController.getOneWithCycle({ name: assessmentName, cycleName }, client)

  return MessageTopicRepository.getOneOrNone({ countryIso, assessment, cycle, key, includeMessages }, client)
}
