import { CountryIso } from '@meta/area'
import { AssessmentName } from '@meta/assessment'
import { Sockets } from '@meta/socket/sockets'

import { SocketServer } from '@server/service/socket'

export const sendRequestReviewUpdateEvents = (props: {
  countryIso: CountryIso
  assessmentName: AssessmentName
  cycleName: string
  topicKey: string
}): void => {
  const { countryIso, assessmentName, cycleName } = props
  SocketServer.emit(Sockets.getRequestReviewSummaryEvent({ countryIso, assessmentName, cycleName }))
  SocketServer.emit(Sockets.getRequestReviewStatusEvent({ countryIso, assessmentName, cycleName }))
}
