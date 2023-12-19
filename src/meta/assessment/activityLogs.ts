import { TFunction } from 'i18next'

import { Cycle } from 'meta/assessment/cycle'
import { Labels } from 'meta/assessment/labels'
import { SubSection } from 'meta/assessment/section'
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
  [ActivityLogMessage.contactCreate]: 'edited',
}

const _getLabelActionKey = (activity: ActivityLog<any>) => {
  const { message } = activity

  const key = messageToKey[message]
  if (key) {
    return `landing.recentActivity.actions.${key}`
  }
  return 'landing.recentActivity.actions.edited'
}

const _getLabelActionParams = (activity: ActivityLog<any>, t: TFunction) => {
  const { target } = activity
  let params = {}
  const { user, role, assessment, status, file } = target ?? {}
  if (user)
    params = {
      user,
      role: role ? t(Users.getI18nRoleLabelKey(role)) : null,
    }
  else if (assessment)
    params = {
      assessment: t(`assessment.${assessment}`),
      status: t(`assessment.status.${status}.label`),
    }
  else if (file) params = { file }
  return params
}

const getLabelAction = (props: { activity: ActivityLog<any>; t: TFunction }) => {
  const { activity, t } = props
  const labelActionKey = _getLabelActionKey(activity)
  const messageParams = _getLabelActionParams(activity, t)
  const label = t(labelActionKey, messageParams)
  return label !== labelActionKey ? label : t('landing.recentActivity.actions.edited')
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

const getLabelSection = (props: { cycle: Cycle; section?: SubSection; activity: ActivityLog<any>; t: TFunction }) => {
  const { cycle, section, activity, t } = props
  const labels = section?.props?.labels
  const labelSectionKey = labels ? Labels.getCycleLabel({ cycle, labels, t }) : getLabelSectionKey(activity)
  return t(labelSectionKey)
}

export const ActivityLogs = {
  getLabelAction,
  hasSectionLink,
  isSectionLinkDisabled,
  getLabelSection,
}
