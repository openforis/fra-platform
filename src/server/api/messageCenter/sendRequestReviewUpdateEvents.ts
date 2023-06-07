import { CountryIso } from 'meta/area'
import { MessageTopic, MessageTopicType } from 'meta/messageCenter'
import { Sockets } from 'meta/socket'

import { SocketServer } from 'server/service/socket'

export const sendRequestReviewUpdateEvents = (props: {
  topic: MessageTopic
  countryIso: CountryIso
  assessmentName: string
  cycleName: string
  sectionName: string
}): void => {
  const { topic, countryIso, assessmentName, cycleName, sectionName } = props
  if (topic.type === MessageTopicType.review) {
    SocketServer.emit(Sockets.getRequestReviewSummaryEvent({ countryIso, assessmentName, cycleName }))
    SocketServer.emit(Sockets.getRequestReviewStatusEvent({ countryIso, assessmentName, cycleName, sectionName }))
  }
}
