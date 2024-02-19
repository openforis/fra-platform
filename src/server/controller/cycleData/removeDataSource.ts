import { CountryIso } from 'meta/area'
import { Assessment, CommentableDescriptionName, Cycle } from 'meta/assessment'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { DescriptionRepository } from 'server/repository/assessmentCycle/descriptions'
import { MessageTopicRepository } from 'server/repository/assessmentCycle/messageTopic'

import { upsertDescription } from './upsertDescription'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  sectionName: string
  uuid: string
  user: User
}

const name = CommentableDescriptionName.dataSources

export const removeDataSource = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { countryIso, assessment, cycle, sectionName, uuid, user } = props
  return client.tx(async (t) => {
    const values = await DescriptionRepository.getValues({ assessment, cycle, countryIso, sectionName, name }, t)

    const value = values[countryIso][sectionName].dataSources
    const index = value.dataSources.findIndex((d) => d.uuid === uuid)
    value.dataSources.splice(index, 1)

    await upsertDescription({ assessment, cycle, countryIso, sectionName, name, value, user }, t)
    await MessageTopicRepository.removeMany({ assessment, cycle, keyPrefix: uuid }, t)
  })
}
