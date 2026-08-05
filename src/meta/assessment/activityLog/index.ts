import { CommentableDescriptionName, CommentableDescriptionValue } from 'meta/assessment/descriptionValue'
import { User } from 'meta/user/user'

export enum ActivityLogMessage {
  assessmentCreate = 'assessmentCreate',
  assessmentCycleCreate = 'assessmentCycleCreate',
  assessmentCycleDelete = 'assessmentCycleDelete',
  assessmentCycleRename = 'assessmentCycleRename',
  assessmentStatusUpdate = 'assessmentStatusUpdate',
  contactCreate = 'contactCreate',
  contactDelete = 'contactDelete',
  contactUpdate = 'contactUpdate',
  cyclePublish = 'cyclePublish',
  descriptionUpdate = 'descriptionUpdate',
  fileCreate = 'fileCreate',
  invitationAccept = 'invitationAccept',
  invitationAdd = 'invitationAdd',
  invitationRemove = 'invitationRemove',
  linksCheckComplete = 'linksCheckComplete',
  linksCheckFail = 'linksCheckFail',
  linksCheckStart = 'linksCheckStart',
  linkUpdate = 'linkUpdate',
  messageCreate = 'messageCreate',
  messageMarkDeleted = 'messageMarkDeleted',
  nodeValueCalculatedUpdate = 'nodeValueCalculatedUpdate',
  nodeValueImport = 'nodeValueImport',
  nodeValueEstimate = 'nodeValueEstimate',
  nodeValuesEstimationCreate = 'nodeValuesEstimationCreate',
  nodeValueUpdate = 'nodeValueUpdate',
  originalDataPointCreate = 'originalDataPointCreate',
  originalDataPointRemove = 'originalDataPointRemove',
  originalDataPointUpdate = 'originalDataPointUpdate',
  originalDataPointUpdateDataSources = 'originalDataPointUpdateDataSources',
  originalDataPointUpdateCommentExtentOfForest = 'originalDataPointUpdateCommentExtentOfForest',
  originalDataPointUpdateCommentForestCharacteristics = 'originalDataPointUpdateCommentForestCharacteristics',
  originalDataPointUpdateNationalClasses = 'originalDataPointUpdateNationalClasses',
  originalDataPointUpdateOriginalData = 'originalDataPointUpdateOriginalData',
  originalDataPointUpdateYear = 'originalDataPointUpdateYear',
  repositoryItemCreate = 'repositoryItemCreate',
  repositoryItemDelete = 'repositoryItemDelete',
  repositoryItemUpdate = 'repositoryItemUpdate',
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
  userPasswordChange = 'userPasswordChange',
  userRemove = 'userRemove',
  userRoleUpdatePermissions = 'userRoleUpdatePermissions',
  userRoleUpdateProps = 'userRoleUpdateProps',
  userRoleUpdateRole = 'userRoleUpdateRole',
  userRoleDeleteRole = 'userRoleDeleteRole',
  userRolesUpdate = 'userRolesUpdate',
  userUpdate = 'userUpdate',
  usersMerge = 'usersMerge',
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
