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
}

const notifyStatusUpdate = (props: props) => {
  const { countryIso, assessmentName, cycleName, status } = props
  const eventName = Sockets.getCountryStatusUpdateEvent({ assessmentName, cycleName })
  SocketServer.emit(eventName, { [countryIso]: status })
}

export const Country = {
  notifyStatusUpdate,
}
