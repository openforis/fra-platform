import { AreaCode, CountryIso } from 'meta/area'
import { Assessment, AssessmentName } from 'meta/assessment/assessment'
import { Cycle, CycleName } from 'meta/assessment/cycle'
import { MessageTopic } from 'meta/messageCenter'

const getRequestReviewSummaryEvent = (props: {
  countryIso: AreaCode
  assessmentName: AssessmentName
  cycleName: string
}) => {
  const { assessmentName, countryIso, cycleName } = props
  return `${countryIso}-${assessmentName}-${cycleName}-request-review-summary`
}

const getRequestReviewStatusEvent = (props: {
  countryIso: CountryIso
  assessmentName: AssessmentName
  cycleName: string
  sectionName: string
}) => {
  const { assessmentName, countryIso, cycleName, sectionName } = props
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
  const { assessmentName, countryIso, cycleName } = props
  return `${countryIso}-${assessmentName}-${cycleName}-odpDelete`
}

const getODPReservedYearsEvent = (props: { countryIso: CountryIso; assessmentName: string; cycleName: string }) => {
  const { assessmentName, countryIso, cycleName } = props
  return `${countryIso}-${assessmentName}-${cycleName}-odpReservedYears`
}

const getNodeValidationsUpdateEvent = (props: {
  countryIso: CountryIso
  assessmentName: AssessmentName
  cycleName: string
}) => {
  const { assessmentName, countryIso, cycleName } = props
  return `${countryIso}-${assessmentName}-${cycleName}-validationsUpdate`
}

const getNodeValuesUpdateEvent = (props: {
  countryIso: AreaCode
  assessmentName: AssessmentName
  cycleName: CycleName
}): string => {
  const { assessmentName, countryIso, cycleName } = props
  return `${countryIso}-${assessmentName}-${cycleName}-nodeUpdates`
}

const getLinksVerificationEvent = (props: { assessmentName: AssessmentName; cycleName: CycleName }) => {
  const { assessmentName, cycleName } = props
  return `${assessmentName}-${cycleName}-linksVerification`
}

const getCountryStatusUpdateEvent = (props: {
  assessmentName: AssessmentName
  cycleName: CycleName
  countryIso: CountryIso
}) => {
  const { assessmentName, countryIso, cycleName } = props
  return `${assessmentName}-${cycleName}-${countryIso}-countryUpdateStatus`
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
  getLinksVerificationEvent,
  getCountryStatusUpdateEvent,
}
