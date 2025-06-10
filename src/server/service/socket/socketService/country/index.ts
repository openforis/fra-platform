import { Country as CountryType } from 'meta/area'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { Sockets } from 'meta/socket'

import { SocketServer } from '../../socketServer/socketServer'

type props = {
  assessmentName: AssessmentName
  cycleName: CycleName
  country: CountryType
  notifyClient?: boolean
}

const notifyUpdate = (props: props) => {
  const { assessmentName, country, cycleName, notifyClient = true } = props
  const { countryIso } = country

  if (notifyClient) {
    const eventName = Sockets.getCountryUpdateEvent({ assessmentName, cycleName, countryIso })
    SocketServer.emit(eventName, { country })
  }
}

export const Country = {
  notifyUpdate,
}
