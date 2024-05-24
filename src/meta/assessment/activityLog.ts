import { CommentableDescriptionName, CommentableDescriptionValue } from 'meta/assessment/commentableDescription'

import { User } from '../user'

export enum ActivityLogMessage {
  assessmentCreate = 'assessmentCreate',
  assessmentCycleCreate = 'assessmentCycleCreate',
  assessmentStatusUpdate = 'assessmentStatusUpdate',
  assessmentUpdate = 'assessmentUpdate',
  contactCreate = 'contactCreate',
  contactDelete = 'contactDelete',
  contactUpdate = 'contactUpdate',
  descriptionUpdate = 'descriptionUpdate',
  fileCreate = 'fileCreate',
  invitationAccept = 'invitationAccept',
  invitationAdd = 'invitationAdd',
  invitationRemove = 'invitationRemove',
  linksCheckCompleted = 'linksCheckCompleted',
  linksCheckFailed = 'linksCheckFailed',
  linksCheckStarted = 'linksCheckStarted',
  linkUpdate = 'linkUpdate',
  messageCreate = 'messageCreate',
  messageMarkDeleted = 'messageMarkDeleted',
  nodeValueCalculatedUpdate = 'nodeValueCalculatedUpdate',
  nodeValueEstimate = 'nodeValueEstimate',
  nodeValuesEstimationCreate = 'nodeValuesEstimationCreate',
  nodeValueUpdate = 'nodeValueUpdate',
  originalDataPointCreate = 'originalDataPointCreate',
  originalDataPointRemove = 'originalDataPointRemove',
  originalDataPointUpdate = 'originalDataPointUpdate',
  originalDataPointUpdateDataSources = 'originalDataPointUpdateDataSources',
  originalDataPointUpdateDescription = 'originalDataPointUpdateDescription',
  originalDataPointUpdateNationalClasses = 'originalDataPointUpdateNationalClasses',
  originalDataPointUpdateOriginalData = 'originalDataPointUpdateOriginalData',
  originalDataPointUpdateYear = 'originalDataPointUpdateYear',
  repositoryItemCreate = 'repositoryItemCreate',
  repositoryItemDelete = 'repositoryItemDelete',
  repositoryItemUpdate = 'repositoryItemUpdate',
  repositoryItemUpdateAccess = 'repositoryItemUpdateAccess',
  sectionCreate = 'sectionCreate',
  sectionDelete = 'sectionDelete',
  sectionUpdate = 'sectionUpdate',
  tableCreate = 'tableCreate',
  tableDelete = 'tableDelete',
  tableSectionCreate = 'tableSectionCreate',
  tableSectionDelete = 'tableSectionDelete',
  tableSectionUpdate = 'tableSectionUpdate',
  tableUpdate = 'tableUpdate',
  tableValuesClear = 'tableValuesClear',
  topicStatusChange = 'topicStatusChange',
  userRemove = 'userRemove',
  userRolesUpdate = 'userRolesUpdate',
  userUpdate = 'userUpdate',
}

export interface ActivityLog<Target> {
  countryIso?: string
  id?: number
  message: ActivityLogMessage
  section: string
  target: Target
  time?: string
  user: User
}

export type ActivityLogDescription = ActivityLog<{
  name: CommentableDescriptionName
  description: { value: CommentableDescriptionValue }
}>
