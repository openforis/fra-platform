import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { Sockets } from 'meta/socket/sockets'

import { SocketServer } from 'server/service/socket'

type Props = {
  nationalDataPoints: Array<OriginalDataPoint>
}

// notifyNationalDataPointUpdate should be called after db tx
export const notifyNationalDataPointUpdate = (props: Props): void => {
  const { nationalDataPoints } = props

  nationalDataPoints.forEach((nationalDataPoint) => {
    const { uuid } = nationalDataPoint
    SocketServer.emit(Sockets.getNationalDataPointUpdateEvent({ uuid }), { nationalDataPoint })
  })
}
