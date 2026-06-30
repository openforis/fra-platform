import { getCountryUpdateEvent } from 'meta/socket/sockets/country'
import { getLinksVerificationEvent } from 'meta/socket/sockets/links'
import {
  getTopicMessageAddEvent,
  getTopicMessageDeleteEvent,
  getTopicStatusEvent,
} from 'meta/socket/sockets/messageTopic'
import {
  getDescriptionValidationsUpdateEvent,
  getNodeValuesUpdateEvent,
  getTableValidationsUpdateEvent,
} from 'meta/socket/sockets/node'
import {
  getNationalDataPointValidationsUpdateEvent,
  getODPDeleteEvent,
  getODPReservedYearsEvent,
} from 'meta/socket/sockets/originalDataPoint'
import { getRequestReviewStatusEvent, getRequestReviewSummaryEvent } from 'meta/socket/sockets/review'

export const Sockets = {
  getDescriptionValidationsUpdateEvent,
  getNodeValuesUpdateEvent,
  getTableValidationsUpdateEvent,
  getNationalDataPointValidationsUpdateEvent,
  getODPDeleteEvent,
  getODPReservedYearsEvent,
  getRequestReviewStatusEvent,
  getRequestReviewSummaryEvent,
  getTopicMessageAddEvent,
  getTopicMessageDeleteEvent,
  getTopicStatusEvent,
  getLinksVerificationEvent,
  getCountryUpdateEvent,
}
