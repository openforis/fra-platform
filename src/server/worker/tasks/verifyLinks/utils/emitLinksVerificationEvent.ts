import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Sockets } from 'meta/socket/sockets'
import { LinksVerificationEvent } from 'meta/socket/sockets/links'

import { SocketServer } from 'server/service/socket'

type Props = {
  assessment: Assessment
  countryIso?: CountryIso
  cycle: Cycle
  event: LinksVerificationEvent
}

export const emitLinksVerificationEvent = (props: Props): void => {
  const { assessment, countryIso, cycle, event } = props

  const linksVerificationEvent = Sockets.getLinksVerificationEvent({
    assessmentName: assessment.props.name,
    countryIso,
    cycleName: cycle.name,
  })
  SocketServer.emit(linksVerificationEvent, { event })
}
