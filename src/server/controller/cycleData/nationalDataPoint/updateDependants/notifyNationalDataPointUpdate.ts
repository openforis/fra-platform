import { Cycle } from 'meta/assessment/cycle'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { Sockets } from 'meta/socket/sockets'

import { SocketServer } from 'server/service/socket'

type Props = {
  cycle: Cycle
  nationalDataPoints: Array<OriginalDataPoint>
  // client that made the change, it already has the update
  socketId?: string
}

// notifyNationalDataPointUpdate should be called after db tx
export const notifyNationalDataPointUpdate = (props: Props): void => {
  const { cycle, nationalDataPoints, socketId } = props

  nationalDataPoints.forEach((nationalDataPoint) => {
    const { countryIso, uuid } = nationalDataPoint
    const eventName = Sockets.getNationalDataPointUpdateEvent({ uuid })
    SocketServer.emitToCountryRooms({ countryIso, cycle, eventName, socketId }, { nationalDataPoint })
  })
}
