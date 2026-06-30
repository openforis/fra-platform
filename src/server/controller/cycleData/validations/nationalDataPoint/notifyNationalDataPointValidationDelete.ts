import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Sockets } from 'meta/socket/sockets'
import { UUID } from 'meta/uuid/uuid'

import { SocketServer } from 'server/service/socket'

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
  uuid: UUID
}

export const notifyNationalDataPointValidationDelete = (props: Props): void => {
  const { assessment, countryIso, cycle, uuid } = props

  const eventName = Sockets.getNationalDataPointValidationsUpdateEvent({
    assessmentName: assessment.props.name,
    countryIso,
    cycleName: cycle.name,
  })

  SocketServer.emit(eventName, { deletedUuids: [uuid] })
}
