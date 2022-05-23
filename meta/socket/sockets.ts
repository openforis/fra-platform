import { CountryIso } from '@meta/area'
import { Assessment, Cycle } from '@meta/assessment'
import { MessageTopic } from '@meta/messageCenter'

const updateReviewSummaryEvent = (props: { countryIso: CountryIso; assessment: Assessment; cycle: Cycle }): string => {
  const { countryIso, assessment, cycle } = props
  return `${countryIso}-${assessment.props.name}-${cycle.name}-review-summary`
}

const getTopicMessageEvent = (props: { assessment: Assessment; cycle: Cycle; topic: MessageTopic }): string => {
  const { assessment, cycle, topic } = props
  return `${topic.countryIso}-${assessment.props.name}-${cycle.name}-${topic.key}-message`
}

const getTopicStatusEvent = (props: { assessment: Assessment; cycle: Cycle; topic: MessageTopic }): string => {
  const { assessment, cycle, topic } = props
  return `${topic.countryIso}-${assessment.props.name}-${cycle.name}-${topic.key}-status`
}

export const Sockets = {
  updateReviewSummaryEvent,
  getTopicMessageEvent,
  getTopicStatusEvent,
}
