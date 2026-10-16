import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { Sockets } from 'meta/socket/sockets'

import { SocketServer } from 'server/service/socket'

type Props = {
  nationalDataPoints: Array<OriginalDataPoint>
  // client that made the change, it already has the update
  socketId?: string
}

// notifyNationalDataPointUpdate should be called after db tx
export const notifyNationalDataPointUpdate = (props: Props): void => {
  const { nationalDataPoints, socketId } = props

  nationalDataPoints.forEach((nationalDataPoint) => {
    const { uuid } = nationalDataPoint
    SocketServer.emitExcept(socketId, Sockets.getNationalDataPointUpdateEvent({ uuid }), { nationalDataPoint })
  })
}
