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
  sectionName: string
}) => {
  const { countryIso, assessmentName, cycleName, sectionName } = props
  return `${countryIso}-${assessmentName}-${cycleName}-${sectionName}-request-review-status`
}

const getTopicMessageAddEvent = (props: { assessment: Assessment; cycle: Cycle; topic: MessageTopic }): string => {
  const { assessment, cycle, topic } = props
  return `${topic.countryIso}-${assessment.props.name}-${cycle.name}-${topic.key}-message-add`
}

const getTopicMessageDeleteEvent = (props: { assessment: Assessment; cycle: Cycle; topic: MessageTopic }): string => {
  const { assessment, cycle, topic } = props
  return `${topic.countryIso}-${assessment.props.name}-${cycle.name}-${topic.key}-message-delete`
}

const getTopicStatusEvent = (props: { assessment: Assessment; cycle: Cycle; topic: MessageTopic }): string => {
  const { assessment, cycle, topic } = props
  return `${topic.countryIso}-${assessment.props.name}-${cycle.name}-${topic.key}-status`
}

const getNodeUpdateEvent = (props: {
  countryIso: CountryIso
  assessmentName: string
  cycleName: string
  tableName: string
  variableName: string
  colName: string
}): string => {
  const { countryIso, assessmentName, cycleName, tableName, variableName, colName } = props
  return `${countryIso}-${assessmentName}-${cycleName}-${tableName}-${variableName}-${colName}-nodeUpdate`
}

export const Sockets = {
  getRequestReviewSummaryEvent,
  getRequestReviewStatusEvent,
  getTopicMessageAddEvent,
  getTopicMessageDeleteEvent,
  getTopicStatusEvent,
  getNodeUpdateEvent,
}
