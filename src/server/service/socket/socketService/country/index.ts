import { CountryIso, CountryStatus } from 'meta/area'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { Sockets } from 'meta/socket'

import { SocketServer } from '../../socketServer/socketServer'

type props = {
  assessmentName: AssessmentName
  cycleName: CycleName
  countryIso: CountryIso
  status: CountryStatus
  notifyClient?: boolean
}

const notifyStatusUpdate = (props: props) => {
  const { assessmentName, countryIso, cycleName, notifyClient = true, status } = props

  if (notifyClient) {
    const eventName = Sockets.getCountryStatusUpdateEvent({ assessmentName, cycleName, countryIso })
    SocketServer.emit(eventName, { status })
  }
}

export const Country = {
  notifyStatusUpdate,
}
