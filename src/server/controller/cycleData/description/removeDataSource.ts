import { Country } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { Topics } from 'meta/messageCenter'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db/db'
import { DescriptionRepository } from 'server/db/repository/assessmentCycle/descriptions'
import { MessageTopicRepository } from 'server/db/repository/assessmentCycle/messageTopic'

import { upsertDescription } from './upsertDescription'

type Props = {
  assessment: Assessment
  cycle: Cycle
  country: Country
  sectionName: string
  uuid: string
  user: User
}

const name = CommentableDescriptionName.dataSources

export const removeDataSource = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, country, cycle, sectionName, user, uuid } = props
  const { countryIso } = country

  return client.tx(async (t) => {
    const values = await DescriptionRepository.getValues({ assessment, cycle, countryIso, sectionName, name }, t)
    const value = values[countryIso][sectionName].dataSources

    if (!value) {
      throw new Error(
        `Unable to find data source value ${assessment.props.name}-${cycle.name}-${countryIso}-${sectionName}}`
      )
    }

    const index = value.dataSources.findIndex((d) => d.uuid === uuid)
    const [dataSource] = value.dataSources.splice(index, 1)

    await upsertDescription({ assessment, cycle, country, sectionName, name, value, user }, t)
    const keyPrefix = Topics.getDataSourceReviewTopicKey(dataSource)
    await MessageTopicRepository.removeMany({ assessment, cycle, keyPrefix }, t)
  })
}
