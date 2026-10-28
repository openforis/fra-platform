import { Country } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { Topics } from 'meta/messageCenter/topics'
import { Sockets } from 'meta/socket/sockets'
import { User } from 'meta/user/user'

import { saveDescription } from 'server/controller/cycleData/description/saveDescription'
import { BaseProtocol, DB } from 'server/db/db'
import { DescriptionRepository } from 'server/db/repository/assessmentCycle/descriptions'
import { MessageTopicRepository } from 'server/db/repository/assessmentCycle/messageTopic'
import { DataValidationService } from 'server/service/dataValidation'
import { SocketServer } from 'server/service/socket'

type Props = {
  assessment: Assessment
  country: Country
  cycle: Cycle
  sectionName: string
  socketId?: string
  user: User
  uuid: string
}

const name = CommentableDescriptionName.dataSources

export const removeDataSource = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, country, cycle, sectionName, socketId, user, uuid } = props
  const { countryIso } = country

  const description = await client.tx(async (t) => {
    const countryISOs = [countryIso]
    const names = [name]
    const sectionNames = [sectionName]
    const values = await DescriptionRepository.getValues({ assessment, countryISOs, cycle, names, sectionNames }, t)
    const value = values[countryIso][sectionName].dataSources

    if (!value) {
      throw new Error(
        `Unable to find data source value ${assessment.props.name}-${cycle.name}-${countryIso}-${sectionName}}`
      )
    }

    const index = value.dataSources.findIndex((d) => d.uuid === uuid)
    const [dataSource] = value.dataSources.splice(index, 1)

    const description = await saveDescription({ assessment, country, cycle, name, sectionName, user, value }, t)
    const keyPrefix = Topics.getDataSourceReviewTopicKey(dataSource)
    await MessageTopicRepository.removeMany({ assessment, cycle, keyPrefix }, t)

    return description
  })

  const eventName = Sockets.getDescriptionUpdateEvent({
    assessmentName: assessment.props.name,
    countryIso,
    cycleName: cycle.name,
  })
  SocketServer.emitExcept({ eventName, socketId }, { name, sectionName, value: description.value })

  await DataValidationService.validateDescriptions({ assessment, country, cycle, descriptions: [description] })
}
