import { CountryIso } from 'meta/area/countryIso'
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
  const { assessmentName, countryIso, cycleName, sectionName, topic } = props
  if (topic.type === MessageTopicType.review) {
    SocketServer.emit(Sockets.getRequestReviewSummaryEvent({ countryIso, assessmentName, cycleName }))
    SocketServer.emit(Sockets.getRequestReviewStatusEvent({ countryIso, assessmentName, cycleName, sectionName }))
  }
}
