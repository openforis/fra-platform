import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { MessageTopic, MessageTopicType } from 'meta/messageCenter/messageTopic'
import { Sockets } from 'meta/socket/sockets'

import { SocketServer } from 'server/service/socket'

type Props = {
  assessment: Assessment
  cycle: Cycle
  sectionName: string
  topic: MessageTopic
}

export const sendRequestReviewUpdateEvents = (props: Props): void => {
  const { assessment, cycle, sectionName, topic } = props
  if (topic.type !== MessageTopicType.review) return

  const assessmentName = assessment.props.name
  const cycleName = cycle.name
  const { countryIso } = topic

  const summaryEvent = Sockets.getRequestReviewSummaryEvent({ assessmentName, countryIso, cycleName })
  const statusEvent = Sockets.getRequestReviewStatusEvent({ assessmentName, countryIso, cycleName, sectionName })
  SocketServer.emitToCountryRooms({ countryIso, cycle, eventName: summaryEvent })
  SocketServer.emitToCountryRooms({ countryIso, cycle, eventName: statusEvent })
}
