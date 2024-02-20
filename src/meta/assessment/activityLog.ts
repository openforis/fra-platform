import { User } from '../user'

export enum ActivityLogMessage {
  assessmentCreate = 'assessmentCreate',
  assessmentCycleCreate = 'assessmentCycleCreate',
  /**
   * @deprecated
   */
  assessmentFileCreate = 'assessmentFileCreate',
  /**
   * @deprecated
   */
  assessmentFileDelete = 'assessmentFileDelete',
  /**
   * @deprecated
   */
  assessmentFileUpdateAccess = 'assessmentFileUpdateAccess',
  /**
   * @deprecated
   */
  assessmentFileUpdate = 'assessmentFileUpdate',
  assessmentStatusUpdate = 'assessmentStatusUpdate',
  assessmentUpdate = 'assessmentUpdate',
  contactCreate = 'contactCreate',
  contactUpdate = 'contactUpdate',
  contactDelete = 'contactDelete',
  descriptionUpdate = 'descriptionUpdate',
  fileCreate = 'fileCreate',
  invitationAccept = 'invitationAccept',
  invitationAdd = 'invitationAdd',
  invitationRemove = 'invitationRemove',
  messageCreate = 'messageCreate',
  messageMarkDeleted = 'messageMarkDeleted',
  nodeValueCalculatedUpdate = 'nodeValueCalculatedUpdate',
  nodeValueEstimate = 'nodeValueEstimate',
  nodeValueUpdate = 'nodeValueUpdate',
  nodeValuesEstimationCreate = 'nodeValuesEstimationCreate',
  originalDataPointCreate = 'originalDataPointCreate',
  originalDataPointRemove = 'originalDataPointRemove',
  originalDataPointUpdate = 'originalDataPointUpdate',
  originalDataPointUpdateDataSources = 'originalDataPointUpdateDataSources',
  originalDataPointUpdateDescription = 'originalDataPointUpdateDescription',
  originalDataPointUpdateNationalClasses = 'originalDataPointUpdateNationalClasses',
  originalDataPointUpdateOriginalData = 'originalDataPointUpdateOriginalData',
  originalDataPointUpdateYear = 'originalDataPointUpdateYear',
  sectionCreate = 'sectionCreate',
  sectionDelete = 'sectionDelete',
  sectionUpdate = 'sectionUpdate',
  tableCreate = 'tableCreate',
  tableDelete = 'tableDelete',
  repositoryItemCreate = 'repositoryItemCreate',
  repositoryItemDelete = 'repositoryItemDelete',
  repositoryItemUpdate = 'repositoryItemUpdate',
  repositoryItemUpdateAccess = 'repositoryItemUpdateAccess',
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
  message: ActivityLogMessage
  section: string
  target: Target
  time?: string
  user: User
}
