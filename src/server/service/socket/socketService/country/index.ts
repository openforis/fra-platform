import { AssessmentStatus, CountryIso } from 'meta/area'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { Sockets } from 'meta/socket'

import { SocketServer } from '../../socketServer/socketServer'

type props = {
  assessmentName: AssessmentName
  cycleName: CycleName
  countryIso: CountryIso
  status: AssessmentStatus
  notifyClient?: boolean
}

const notifyStatusUpdate = (props: props) => {
  const { countryIso, assessmentName, cycleName, status, notifyClient = true } = props

  if (notifyClient) {
    const eventName = Sockets.getCountryStatusUpdateEvent({ assessmentName, cycleName, countryIso })
    SocketServer.emit(eventName, { status })
  }
}

export const Country = {
  notifyStatusUpdate,
}
