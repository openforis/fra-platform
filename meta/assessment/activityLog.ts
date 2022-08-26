import { User } from '../user'

export enum ActivityLogMessage {
  assessmentCreate = 'assessmentCreate',
  assessmentCycleCreate = 'assessmentCycleCreate',
  originalDataPointCreate = 'originalDataPointCreate',
  originalDataPointUpdate = 'originalDataPointUpdate',
  originalDataPointRemove = 'originalDataPointRemove',
  updateCountry = 'updateCountry',
  descriptionUpdate = 'descriptionUpdate',
  nodeValueUpdate = 'nodeValueUpdate',
  tableValuesClear = 'tableValuesClear',
  nodeValueCalculatedUpdate = 'nodeValueCalculatedUpdate',
  messageCreate = 'messageCreate',
  messageMarkDeleted = 'messageMarkDeleted',
  topicStatusChange = 'topicStatusChange',
  addInvitation = 'addInvitation',
  acceptInvitation = 'acceptInvitation',
}

export interface ActivityLog<Target> {
  target: Target
  message: ActivityLogMessage
  countryIso?: string
  section: string
  user: User
  time?: string
}
