import { AreaCode, CountryIso } from 'meta/area'
import { Assessment, AssessmentName, Cycle } from 'meta/assessment'
import { MessageTopic } from 'meta/messageCenter'

const getRequestReviewSummaryEvent = (props: {
  countryIso: AreaCode
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

const getODPDeleteEvent = (props: { countryIso: CountryIso; assessmentName: string; cycleName: string }) => {
  const { assessmentName, cycleName, countryIso } = props
  return `${countryIso}-${assessmentName}-${cycleName}-odpDelete`
}

const getODPReservedYearsEvent = (props: { countryIso: CountryIso; assessmentName: string; cycleName: string }) => {
  const { assessmentName, cycleName, countryIso } = props
  return `${countryIso}-${assessmentName}-${cycleName}-odpReservedYears`
}

const getNodeValidationsUpdateEvent = (props: {
  countryIso: CountryIso
  assessmentName: AssessmentName
  cycleName: string
}) => {
  const { assessmentName, cycleName, countryIso } = props
  return `${countryIso}-${assessmentName}-${cycleName}-validationsUpdate`
}

const getNodeValuesUpdateEvent = (props: {
  countryIso: AreaCode
  assessmentName: string
  cycleName: string
}): string => {
  const { countryIso, assessmentName, cycleName } = props
  return `${countryIso}-${assessmentName}-${cycleName}-nodeUpdates`
}

export const Sockets = {
  getNodeValidationsUpdateEvent,
  getNodeValuesUpdateEvent,
  getODPDeleteEvent,
  getODPReservedYearsEvent,
  getRequestReviewStatusEvent,
  getRequestReviewSummaryEvent,
  getTopicMessageAddEvent,
  getTopicMessageDeleteEvent,
  getTopicStatusEvent,
}
