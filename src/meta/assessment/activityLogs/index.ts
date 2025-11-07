import { TFunction } from 'i18next'

import { AreaCode } from 'meta/area'
import { ActivityLog, ActivityLogMessage } from 'meta/assessment/activityLog'
import { AssessmentName } from 'meta/assessment/assessment'
import { Cycle, CycleName } from 'meta/assessment/cycle'
import { Labels } from 'meta/assessment/labels'
import { SectionName, SectionNames, SubSection } from 'meta/assessment/section'
import { Routes } from 'meta/routes'
import { RoleName, Users } from 'meta/user'

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
  [ActivityLogMessage.originalDataPointUpdateCommentExtentOfForest]: 'updated',
  [ActivityLogMessage.originalDataPointUpdateCommentForestCharacteristics]: 'updated',
  [ActivityLogMessage.originalDataPointUpdateNationalClasses]: 'updated',
  [ActivityLogMessage.originalDataPointUpdateOriginalData]: 'updated',
  [ActivityLogMessage.originalDataPointUpdateYear]: 'updated',
  [ActivityLogMessage.originalDataPointUpdate]: 'updated',
  [ActivityLogMessage.topicStatusChange]: 'resolved',
}

const _getLabelActionKey = (activity: ActivityLog<unknown>): string => {
  const { message } = activity

  const key = messageToKey[message]
  if (key) {
    return `landing.recentActivity.actions.${key}`
  }
  return 'landing.recentActivity.actions.edited'
}

const _getLabelActionParams = (activity: ActivityLog<unknown>, t: TFunction): Record<string, string | null> => {
  const { target } = activity
  let params: Record<string, string | null> = {}

  if (target && typeof target === 'object') {
    if ('user' in target && target.user) {
      const { role, user } = target as { user: string; role?: RoleName }
      params = {
        user,
        role: role ? t(Users.getI18nRoleLabelKey(role)) : null,
      }
    } else if ('assessment' in target && target.assessment) {
      const { assessment, status } = target as { assessment: string; status: string }
      params = {
        assessment: t(`assessment.${assessment}`),
        status: t(`assessment.status.${status}.label`),
      }
    } else if ('file' in target && target.file) {
      const { file } = target as { file: string }
      params = { file }
    }
  }

  return params
}

const getLabelAction = (props: { activity: ActivityLog<unknown>; t: TFunction }): string => {
  const { activity, t } = props
  const labelActionKey = _getLabelActionKey(activity)
  const messageParams = _getLabelActionParams(activity, t)
  const label = t(labelActionKey, messageParams)
  return label !== labelActionKey ? label : t('landing.recentActivity.actions.edited')
}

const getLabelSectionKey = (activity: ActivityLog<unknown>): string => {
  const { section } = activity
  if (section.indexOf('odp') !== -1) {
    return 'nationalDataPoint.nationalDataPoint'
  }

  if (section === SectionNames.contacts) {
    return 'landing.users.users'
  }

  return `${section}.${section}`
}

const hasSectionLink = (activity: ActivityLog<unknown>): boolean => {
  const { section } = activity
  return !['users', 'assessment'].includes(section)
}

const isSectionLinkDisabled = (activity: ActivityLog<unknown>): boolean => {
  const { section } = activity
  const labelSectionKey = getLabelSectionKey(activity)
  return ['fileRepository', 'messageBoard', 'odp'].includes(section) || labelSectionKey === 'dashboard.actions.deleted'
}

const getLabelSection = (props: {
  activity: ActivityLog<unknown>
  cycle: Cycle
  section?: SubSection
  t: TFunction
}): string => {
  const { activity, cycle, section, t } = props
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
  const { assessmentName, countryIso, cycleName, sectionName: sectionNameProp } = props

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
