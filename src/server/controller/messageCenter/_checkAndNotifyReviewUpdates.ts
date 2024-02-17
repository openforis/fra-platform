import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { MessageTopic, MessageTopicType } from 'meta/messageCenter'
import { Sockets } from 'meta/socket'

import { SocketServer } from 'server/service/socket'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  sectionName: string
  topic: MessageTopic
}

export const _checkAndNotifyReviewUpdates = async (props: Props): Promise<void> => {
  const { assessment, cycle, countryIso, sectionName, topic } = props

  if (topic.type === MessageTopicType.review) {
    const assessmentName = assessment.props.name
    const cycleName = cycle.name

    const socketProps = { assessmentName, cycleName, countryIso }
    SocketServer.emit(Sockets.getRequestReviewSummaryEvent(socketProps))
    SocketServer.emit(Sockets.getRequestReviewStatusEvent({ ...socketProps, sectionName }))
  }
}
