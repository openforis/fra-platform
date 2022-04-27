import { Assessment, Cycle } from '@meta/assessment'
import { MessageTopic } from '@meta/messageCenter'

const getTopicEvent = (props: { assessment: Assessment; cycle: Cycle; topic: MessageTopic }): string => {
  const { assessment, cycle, topic } = props
  return `${topic.countryIso}-${assessment.props.name}-${cycle.name}-${topic.key}`
}

export const Sockets = {
  getTopicEvent,
}
