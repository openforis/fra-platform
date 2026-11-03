import { Country } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { CommentableDescriptionName, CommentableDescriptionValue } from 'meta/assessment/descriptionValue'
import { Sockets } from 'meta/socket/sockets'
import { User } from 'meta/user/user'

import { saveDescription } from 'server/controller/cycleData/description/saveDescription'
import { BaseProtocol, DB } from 'server/db/db'
import { DataValidationService } from 'server/service/dataValidation'
import { SocketServer } from 'server/service/socket'

type Props = {
  assessment: Assessment
  country: Country
  cycle: Cycle
  name: CommentableDescriptionName
  sectionName: string
  socketId?: string
  user: User
  value: CommentableDescriptionValue
}

export const upsertDescription = async (
  props: Props,
  client: BaseProtocol = DB
): Promise<CommentableDescriptionValue> => {
  const { assessment, country, cycle, name, sectionName, socketId } = props
  const { countryIso } = country

  const description = await saveDescription(props, client)

  const eventName = Sockets.getDescriptionUpdateEvent({
    assessmentName: assessment.props.name,
    countryIso,
    cycleName: cycle.name,
  })
  SocketServer.emitExcept({ eventName, socketId }, { name, sectionName, value: description.value })

  await DataValidationService.validateDescriptions({
    assessment,
    country,
    cycle,
    descriptions: [description],
  })

  return description.value
}
