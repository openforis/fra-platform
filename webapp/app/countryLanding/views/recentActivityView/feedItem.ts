// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import { i18nUserRole } from '@common/userUtils'

// Action

const getLabelActionKey = (feedItem: any) => {
  const messageToKey = {
    createIssue: 'commented',
    createComment: 'commented',
    markAsResolved: 'resolved',
    deleteOdp: 'deleted',
    createOdp: 'added',
    addUser: 'addUser', // Legacy, no longer created
    updateUser: 'updateUser',
    removeUser: 'removeUser',
    acceptInvitation: 'acceptInvitation',
    addInvitation: 'addInvitation',
    removeInvitation: 'removeInvitation',
    updateInvitation: 'updateInvitation',
    updateAssessmentStatus: 'updateAssessmentStatus',
    fileRepositoryUpload: 'addedFile',
    fileRepositoryDelete: 'deletedFile',
  }
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  const key = messageToKey[feedItem.message]
  if (key) {
    return `landing.recentActivity.actions.${key}`
  }
  return 'landing.recentActivity.actions.edited'
}

const getLabelActionParams = (i18n: any) => (feedItem: any) => {
  let params = {}

  const target = R.propOr({}, 'target')(feedItem)
  const { user, role, assessment, status, file } = target

  if (user)
    params = {
      user,
      role: role ? i18nUserRole(i18n, role) : null,
    }
  if (assessment) {
    params = {
      assessment: i18n.t(`assessment.${assessment}`),
      status: i18n.t(`assessment.status.${status}.label`),
    }
  }
  if (file) {
    params = { file }
  }

  return params
}

export const getLabelAction = (i18n: any) => (feedItem: any) => {
  const labelActionKey = getLabelActionKey(feedItem)
  const messageParams = getLabelActionParams(i18n)(feedItem)
  return i18n.t(labelActionKey, messageParams)
}

// Section

const getLabelSectionKey = (feedItem: any) => {
  const { sectionName } = feedItem
  if (R.includes(sectionName, 'odp')) {
    return 'nationalDataPoint.nationalDataPoint'
  }
  if (sectionName === 'fileRepository') {
    return 'landing.sections.links'
  }
  return `${sectionName}.${sectionName}`
}

export const hasSectionLink = (feedItem: any) => {
  const { sectionName } = feedItem
  return !['users', 'assessment'].includes(sectionName)
}

export const isSectionLinkDisabled = (feedItem: any) => {
  const { sectionName } = feedItem
  const labelSectionKey = getLabelSectionKey(feedItem)
  return ['odp', 'fileRepository'].includes(sectionName) || labelSectionKey === 'dashboard.actions.deleted'
}

export const getLabelSection = (i18n: any) => (feedItem: any) => {
  const labelSectionKey = getLabelSectionKey(feedItem)
  return i18n.t(labelSectionKey)
}
