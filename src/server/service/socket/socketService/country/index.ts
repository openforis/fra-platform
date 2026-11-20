import { Country as CountryType } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Sockets } from 'meta/socket/sockets'

import { SocketServer } from '../../socketServer'

type props = {
  assessment: Assessment
  cycle: Cycle
  country: CountryType
  notifyClient?: boolean
}

const notifyUpdate = (props: props): void => {
  const { assessment, country, cycle, notifyClient = true } = props
  const { countryIso } = country

  if (notifyClient) {
    const assessmentName = assessment.props.name
    const cycleName = cycle.name
    const eventName = Sockets.getCountryUpdateEvent({ assessmentName, cycleName, countryIso })
    SocketServer.emitToCountryRooms({ countryIso, cycle, eventName }, { country })
  }
}

export const Country = {
  notifyUpdate,
}
