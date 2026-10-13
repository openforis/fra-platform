import { type Locator, type Page } from '@playwright/test'
import { enTranslation } from 'i18n/resources/en'

import { ApiEndPoint } from 'meta/api/endpoint'
import { type ODPNationalClass, type OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { type SectionName } from 'meta/assessment/section'
import { MessageTopicType } from 'meta/messageCenter/messageTopic'
import { Topics } from 'meta/messageCenter/topics'

import { type TopicLocation } from 'test/e2e/api/messageCenter'
import { DOMUtils } from 'test/e2e/utils/dom'

type NationalClassTopicProps = {
  nationalClass: ODPNationalClass
  ndp: OriginalDataPoint
  sectionName: SectionName
}

// The topic behind the review button of a national class
const getNationalClassTopicLocation = (props: NationalClassTopicProps): TopicLocation => {
  const { nationalClass, ndp, sectionName } = props

  return {
    countryIso: ndp.countryIso,
    key: Topics.getOdpClassReviewTopicKey(ndp.id, nationalClass.uuid, 'definition'),
    sectionName,
    type: MessageTopicType.review,
  }
}

const getTopic = (page: Page): Locator => page.locator('.topic')

const getResolveButton = (page: Page): Locator =>
  getTopic(page).getByRole('button', { name: enTranslation.review.resolve, exact: true })

const addComment = async (page: Page, text: string): Promise<void> => {
  const topic = getTopic(page)

  const posted = DOMUtils.waitForResponse(page, ApiEndPoint.MessageCenter.topicMessage(), 'POST')
  await topic.getByPlaceholder(enTranslation.review.writeComment, { exact: true }).fill(text)
  await topic.getByRole('button', { name: enTranslation.common.add, exact: true }).click()
  await posted
}

const deleteComment = async (page: Page): Promise<void> => {
  const deleted = DOMUtils.waitForResponse(page, ApiEndPoint.MessageCenter.topicMessage(), 'DELETE')
  await getTopic(page).locator('.message .btn-remove-msg').click()
  await deleted
}

const resolveComments = async (page: Page): Promise<void> => {
  const resolved = DOMUtils.waitForResponse(page, ApiEndPoint.MessageCenter.topicResolve(), 'PUT')
  await getResolveButton(page).click()
  await resolved
}

export const MessageCenterUtils = {
  addComment,
  deleteComment,
  getNationalClassTopicLocation,
  getResolveButton,
  getTopic,
  resolveComments,
}
