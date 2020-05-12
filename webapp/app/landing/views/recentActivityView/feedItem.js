import * as R from 'ramda'
import { i18nUserRole } from '@common/userUtils'

// Action

const getLabelActionKey = (feedItem) => {
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
  const key = messageToKey[feedItem.message]
  if (key) {
    return `landing.recentActivity.actions.${key}`
  }
  return 'landing.recentActivity.actions.edited'
}

const getLabelActionParams = (i18n) => (feedItem) => {
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

export const getLabelAction = (i18n) => (feedItem) => {
  const labelActionKey = getLabelActionKey(feedItem)
  const messageParams = getLabelActionParams(i18n)(feedItem)
  return i18n.t(labelActionKey, messageParams)
}

// Section

const getLabelSectionKey = (feedItem) => {
  const { sectionName } = feedItem
  if (R.includes(sectionName, 'odp')) {
    return 'nationalDataPoint.nationalDataPoint'
  }
  if (sectionName === 'fileRepository') {
    return 'landing.sections.links'
  }
  return `${sectionName}.${sectionName}`
}

export const hasSectionLink = (feedItem) => {
  const { sectionName } = feedItem
  return !['users', 'assessment'].includes(sectionName)
}

export const isSectionLinkDisabled = (feedItem) => {
  const { sectionName } = feedItem
  const labelSectionKey = getLabelSectionKey(feedItem)
  return ['odp', 'fileRepository'].includes(sectionName) || labelSectionKey === 'dashboard.actions.deleted'
}

export const getLabelSection = (i18n) => (feedItem) => {
  const labelSectionKey = getLabelSectionKey(feedItem)
  return i18n.t(labelSectionKey)
}
