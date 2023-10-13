import { i18n } from 'i18next'

import { Users } from 'meta/user'

import { ActivityLog, ActivityLogMessage } from './activityLog'

// Action

const messageToKey: { [key in keyof typeof ActivityLogMessage]?: string } = {
  [ActivityLogMessage.originalDataPointCreate]: 'added',
  [ActivityLogMessage.originalDataPointRemove]: 'deleted',
  [ActivityLogMessage.originalDataPointUpdate]: 'updated',
  [ActivityLogMessage.originalDataPointUpdateDescription]: 'updated',
  [ActivityLogMessage.originalDataPointUpdateDataSources]: 'updated',
  [ActivityLogMessage.originalDataPointUpdateNationalClasses]: 'updated',
  [ActivityLogMessage.originalDataPointUpdateOriginalData]: 'updated',
  [ActivityLogMessage.originalDataPointUpdateYear]: 'updated',
  [ActivityLogMessage.assessmentStatusUpdate]: 'updateAssessmentStatus',
  [ActivityLogMessage.messageCreate]: 'commented',
  [ActivityLogMessage.messageMarkDeleted]: 'deleted',
  [ActivityLogMessage.topicStatusChange]: 'resolved',
  [ActivityLogMessage.invitationAccept]: 'acceptInvitation',
  [ActivityLogMessage.invitationAdd]: 'addInvitation',
  [ActivityLogMessage.invitationRemove]: 'removeInvitation',
}

const getLabelActionKey = (activity: ActivityLog<any>) => {
  const { message } = activity

  const key = messageToKey[message]
  if (key) {
    return `landing.recentActivity.actions.${key}`
  }
  return 'landing.recentActivity.actions.edited'
}

const getLabelActionParams = (activity: ActivityLog<any>, i18n: i18n) => {
  const { target } = activity
  let params = {}
  const { user, role, assessment, status, file } = target ?? {}
  if (user)
    params = {
      user,
      role: role ? i18n.t(Users.getI18nRoleLabelKey(role)) : null,
    }
  else if (assessment)
    params = {
      assessment: i18n.t(`assessment.${assessment}`),
      status: i18n.t(`assessment.status.${status}.label`),
    }
  else if (file) params = { file }
  return params
}

const getLabelAction = (activity: ActivityLog<any>, i18n: i18n) => {
  const labelActionKey = getLabelActionKey(activity)
  const messageParams = getLabelActionParams(activity, i18n)
  const label = i18n.t(labelActionKey, messageParams)
  return label !== labelActionKey ? label : i18n.t('landing.recentActivity.actions.edited')
}

// Section

const getLabelSectionKey = (activity: ActivityLog<any>) => {
  const { section } = activity
  if (section.indexOf('odp') !== -1) {
    return 'nationalDataPoint.nationalDataPoint'
  }
  if (section === 'fileRepository') {
    return 'landing.sections.links'
  }
  return `${section}.${section}`
}

const hasSectionLink = (activity: ActivityLog<any>) => {
  const { section } = activity
  return !['users', 'assessment'].includes(section)
}

const isSectionLinkDisabled = (activity: ActivityLog<any>) => {
  const { section } = activity
  const labelSectionKey = getLabelSectionKey(activity)
  return ['fileRepository', 'messageBoard', 'odp'].includes(section) || labelSectionKey === 'dashboard.actions.deleted'
}

const getLabelSection = (activity: ActivityLog<any>, i18n: i18n) => {
  const labelSectionKey = getLabelSectionKey(activity)
  return i18n.t(labelSectionKey)
}

export const ActivityLogs = {
  getLabelAction,
  hasSectionLink,
  isSectionLinkDisabled,
  getLabelSection,
}
