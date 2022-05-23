import { CountryIso } from '@meta/area'
import { Assessment, AssessmentName, Cycle } from '@meta/assessment'
import { MessageTopic } from '@meta/messageCenter'

const updateReviewSummaryEvent = (props: {
  countryIso: CountryIso
  assessmentName: AssessmentName
  cycleName: string
}) => {
  const { countryIso, assessmentName, cycleName } = props
  return `${countryIso}-${assessmentName}-${cycleName}-review-summary`
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
