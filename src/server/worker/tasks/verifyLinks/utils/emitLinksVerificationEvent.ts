import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { LinksVerificationEvent } from 'meta/socket/event/links'
import { Sockets } from 'meta/socket/sockets'
import { Objects } from 'utils/objects'

import { SocketServer } from 'server/service/socket'

type Props = {
  assessment: Assessment
  countryIso?: CountryIso
  cycle: Cycle
  event: LinksVerificationEvent
}

export const emitLinksVerificationEvent = (props: Props): void => {
  const { assessment, countryIso, cycle, event } = props

  const eventName = Sockets.getLinksVerificationEvent({
    assessmentName: assessment.props.name,
    countryIso,
    cycleName: cycle.name,
  })

  if (Objects.isEmpty(countryIso)) {
    SocketServer.emitToAdminRooms({ eventName }, { event })
    return
  }

  SocketServer.emitToCountryRooms({ countryIso, cycle, eventName }, { event })
}
