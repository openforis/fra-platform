import { TFunction } from 'i18next'

import { AreaCode } from 'meta/area'
import { AssessmentName } from 'meta/assessment/assessmentName'
import { Cycle, CycleName } from 'meta/assessment/cycle'
import { Labels } from 'meta/assessment/labels'
import { SectionName, SectionNames, SubSection } from 'meta/assessment/section'
import { Routes } from 'meta/routes'
import { Users } from 'meta/user'

import { ActivityLog, ActivityLogMessage } from './activityLog'

// Action

const messageToKey: { [key in keyof typeof ActivityLogMessage]?: string } = {
  [ActivityLogMessage.assessmentStatusUpdate]: 'updateAssessmentStatus',
  [ActivityLogMessage.contactCreate]: 'added',
  [ActivityLogMessage.contactDelete]: 'deleted',
  [ActivityLogMessage.invitationAccept]: 'acceptInvitation',
  [ActivityLogMessage.invitationAdd]: 'addInvitation',
  [ActivityLogMessage.invitationRemove]: 'removeInvitation',
  [ActivityLogMessage.messageCreate]: 'commented',
  [ActivityLogMessage.messageMarkDeleted]: 'deleted',
  [ActivityLogMessage.originalDataPointCreate]: 'added',
  [ActivityLogMessage.originalDataPointRemove]: 'deleted',
  [ActivityLogMessage.originalDataPointUpdateDataSources]: 'updated',
  [ActivityLogMessage.originalDataPointUpdateDescription]: 'updated',
  [ActivityLogMessage.originalDataPointUpdateNationalClasses]: 'updated',
  [ActivityLogMessage.originalDataPointUpdateOriginalData]: 'updated',
  [ActivityLogMessage.originalDataPointUpdateYear]: 'updated',
  [ActivityLogMessage.originalDataPointUpdate]: 'updated',
  [ActivityLogMessage.topicStatusChange]: 'resolved',
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
    return 'landing.sections.repository'
  }

  if (section === SectionNames.contacts) {
    return 'landing.users.users'
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

type GetSectionLinkProp = {
  countryIso: AreaCode
  assessmentName: AssessmentName
  cycleName: CycleName
  sectionName: SectionName
}

const getSectionLink = (props: GetSectionLinkProp): string => {
  const { countryIso, assessmentName, cycleName, sectionName: sectionNameProp } = props

  const sectionNameMap: { [key in SectionName]?: SectionName } = {
    [SectionNames.contacts]: SectionNames.contactPersons,
  }

  const sectionName = sectionNameMap[sectionNameProp] ?? sectionNameProp

  return Routes.Section.generatePath({ countryIso, assessmentName, cycleName, sectionName })
}

export const ActivityLogs = {
  getLabelAction,
  getLabelSection,
  getSectionLink,
  hasSectionLink,
  isSectionLinkDisabled,
}
