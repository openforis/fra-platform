import { CountryIso } from '@meta/area'
import { Assessment, AssessmentName, Cycle } from '@meta/assessment'
import { MessageTopic } from '@meta/messageCenter'

const getRequestReviewSummaryEvent = (props: {
  countryIso: CountryIso
  assessmentName: AssessmentName
  cycleName: string
}) => {
  const { countryIso, assessmentName, cycleName } = props
  return `${countryIso}-${assessmentName}-${cycleName}-request-review-summary`
}

const getRequestReviewStatusEvent = (props: {
  countryIso: CountryIso
  assessmentName: AssessmentName
  cycleName: string
  topicKey: string
}) => {
  const { countryIso, assessmentName, cycleName, topicKey } = props
  return `${countryIso}-${assessmentName}-${cycleName}-${topicKey}-request-review-status`
}

const getTopicMessageAddEvent = (props: { assessment: Assessment; cycle: Cycle; topic: MessageTopic }): string => {
  const { assessment, cycle, topic } = props
  return `${topic.countryIso}-${assessment.props.name}-${cycle.name}-${topic.key}-message-add`
}

const getTopicMessageDeleteEvent = (props: {
  countryIso: CountryIso
  assessment: Assessment
  cycle: Cycle
  topicKey: string
}): string => {
  const { countryIso, assessment, cycle, topicKey } = props
  return `${countryIso}-${assessment.props.name}-${cycle.name}-${topicKey}-message-delete`
}

const getTopicStatusEvent = (props: { assessment: Assessment; cycle: Cycle; topic: MessageTopic }): string => {
  const { assessment, cycle, topic } = props
  return `${topic.countryIso}-${assessment.props.name}-${cycle.name}-${topic.key}-status`
}

export const Sockets = {
  getRequestReviewSummaryEvent,
  getRequestReviewStatusEvent,
  getTopicMessageAddEvent,
  getTopicMessageDeleteEvent,
  getTopicStatusEvent,
}
